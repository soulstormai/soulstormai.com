import { GoogleGenAI, Type } from "@google/genai";
import { PetProfile, Itinerary, TravelRecommendation, CountryRegulations } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a pet photo to determine breed, travel tips, and health suggestions.
 * @param base64Image - Base64 encoded image string
 * @param isPremium - Whether user has premium subscription (affects response detail)
 */
export const analyzePetPhoto = async (base64Image: string, isPremium: boolean = false): Promise<Partial<PetProfile>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: `Analyze this pet image. Identify the likely breed. 
            Provide:
            1. 3 specific travel tips for this breed (temperament, breathing, energy).
            2. List of 3 common vaccines or health checks recommended for this breed before travel.
            3. Estimated anxiety level (Low/Medium/High).
            
            Return JSON with keys: breed, travelTips (array), suggestedVaccines (array), anxietyLevel.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            breed: { type: Type.STRING },
            travelTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestedVaccines: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
            },
            anxietyLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          },
          required: ["breed", "travelTips", "suggestedVaccines", "anxietyLevel"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Error analyzing pet:", error);
    throw error;
  }
};

/**
 * Helper to parse JSON from potential Markdown code blocks
 */
const parseJSONResponse = (text: string) => {
    try {
        // Remove markdown code blocks if present
        let clean = text.replace(/```json\n/g, '').replace(/\n```/g, '');
        clean = clean.replace(/```/g, ''); // Safety net
        return JSON.parse(clean);
    } catch (e) {
        console.error("Failed to parse JSON", e);
        return {};
    }
};

/**
 * Fetches detailed international pet travel regulations for a specific country.
 * @param country - Destination country
 * @param petDetails - Pet details string
 * @param isPremium - Whether user has premium subscription (enables expensive Google Search grounding)
 */
export const getCountryRegulations = async (country: string, petDetails: string, isPremium: boolean = false): Promise<CountryRegulations> => {
  try {
    const prompt = isPremium
      ? `I am planning to travel to ${country} with my pet (${petDetails}).

    Using Google Search, find the official and most recent pet import/entry requirements for ${country}.
    Provide a comprehensive guide including:
    1. Microchip ISO standards and timing.
    2. Rabies vaccination and Titer test requirements (exact timing window).
    3. Health Certificate timelines (e.g. USDA endorsement or EU Pet Passport).
    4. Tapeworm treatment (if applicable).
    5. Banned breeds list.
    6. Quarantine rules.
    7. Any specific prohibited items for pets (e.g. certain pet foods, medications).
    8. A general emergency contact or government agency for pet import (e.g. APHIS, DEFRA).

    Format the output as a valid JSON object matching this structure:
    {
      "country": "${country}",
      "summary": "Brief overview...",
      "entryRequirements": ["Requirement 1", ...],
      "documentsRequired": ["Doc 1", ...],
      "bannedBreeds": ["Breed 1", ...],
      "quarantineInfo": "Details...",
      "airlineTips": "Tips including carrier/crate dimensions for international flights...",
      "emergencyContacts": "Name of agency or emergency number...",
      "prohibitedItems": ["Item 1", ...]
    }`
      : `Provide general pet travel requirements for ${country} based on common international regulations.
    Include microchip, rabies vaccination, health certificate, and quarantine information.
    Format as valid JSON matching this structure:
    {
      "country": "${country}",
      "summary": "General overview based on typical requirements...",
      "entryRequirements": ["Common requirements..."],
      "documentsRequired": ["Typical documents..."],
      "bannedBreeds": [],
      "quarantineInfo": "General quarantine information...",
      "airlineTips": "Standard airline tips...",
      "emergencyContacts": "Consult official ${country} government website",
      "prohibitedItems": []
    }
    Note: Upgrade to Premium for real-time verified information via Google Search.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: isPremium ? {
        tools: [{ googleSearch: {} }],
      } : {},
    });

    const data = response.text ? parseJSONResponse(response.text) : {};
    
    // Fallback if empty
    return {
        country: data.country || country,
        summary: data.summary || "Could not retrieve specific details. Please check official government websites.",
        entryRequirements: data.entryRequirements || [],
        documentsRequired: data.documentsRequired || [],
        bannedBreeds: data.bannedBreeds || [],
        quarantineInfo: data.quarantineInfo || "Check specific quarantine rules.",
        airlineTips: data.airlineTips || "Check with your specific carrier.",
        emergencyContacts: data.emergencyContacts || "Local Vet Emergency Services",
        prohibitedItems: data.prohibitedItems || []
    };

  } catch (error) {
    console.error("Failed to fetch regulations", error);
    throw error;
  }
};

/**
 * Generates a travel itinerary or hotel search with specific date-based airline rules and grounding.
 * @param destination - Travel destination
 * @param startDate - Start date
 * @param endDate - End date
 * @param petDetails - Pet details string
 * @param type - Type of search ('trip' or 'hotel')
 * @param isPremium - Whether user has premium subscription (enables expensive Google Search/Maps grounding)
 */
export const planTrip = async (destination: string, startDate: string, endDate: string, petDetails: string, type: 'trip' | 'hotel' = 'trip', isPremium: boolean = false): Promise<Itinerary> => {
  try {
    let prompt = '';
    
    if (type === 'hotel') {
        prompt = `I am looking for STRICTLY confirmed pet-friendly accommodation in ${destination} for my stay from ${startDate} to ${endDate}. My pet is: ${petDetails}.
        
        Using Google Maps and Search:
        1. Find 5 top-rated hotels in ${destination} that explicitly state they are pet-friendly.
           - IMPORTANT: Search specifically for properties from major pet-friendly chains like Marriott (Westin, Aloft, W Hotels), Kimpton, or similar reliable brands in the area.
           - Verify the pet policy exists (look for "pets allowed" or specific pet fees).
           - Do not include hotels where the policy is unclear.
        2. For each hotel, include the pet fee or weight limit in the description if available.
        3. Find 3 nearby pet-friendly parks or walking areas.
        4. Provide a brief weather summary for the dates.
        
        Format the output as a valid JSON object (do not use Markdown) matching this structure:
        {
          "airlinePolicy": "",
          "weatherAlert": "Weather summary...",
          "recommendations": [
            { "category": "Hotel", "title": "Hotel Name", "description": "Description including specific pet fee and confirmed policy", "rating": "4.5", "priceLevel": "$$" },
            { "category": "Activity", "title": "Park Name", "description": "Park details", "rating": "4.8" }
          ]
        }`;
    } else {
        prompt = `I am traveling to ${destination} from ${startDate} to ${endDate} with my pet (${petDetails}). 
        
        Using Google Search and Maps:
        1. The specific pet travel policy for major airlines flying to ${destination} (e.g. Delta, United, Air France, or local carriers). INCLUDE crate dimension requirements if found.
        2. 3 Specific pet-friendly hotels in ${destination}.
           - MUST be confirmed pet-friendly.
           - Search for Marriott, Kimpton, or other known pet-friendly brands in ${destination}.
        3. 2 Pet-friendly parks or activities.
        4. Find 1 top-rated 24/7 Emergency Veterinary Clinic in ${destination}.
        5. Weather forecast for ${destination} during ${startDate} to ${endDate} and pet safety warnings.
        
        Format the output as a valid JSON object (do not use Markdown) matching this structure:
        {
          "airlinePolicy": "Summary of airline rules...",
          "weatherAlert": "Weather summary...",
          "recommendations": [
            { "category": "Hotel", "title": "Name", "description": "Details with confirmed pet policy", "rating": "4.5", "priceLevel": "$$" },
            { "category": "Activity", "title": "Name", "description": "Details", "rating": "4.8" },
            { "category": "Vet", "title": "Clinic Name", "description": "Emergency contact info", "rating": "5.0" },
            { "category": "Regulation", "title": "Rule", "description": "Details" }
          ]
        }`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: isPremium ? prompt : prompt + '\n\nNote: Provide general recommendations based on common knowledge. Upgrade to Premium for real-time verified data via Google Search and Maps.',
      config: isPremium ? {
        tools: [{ googleSearch: {} }, { googleMaps: {} }],
      } : {},
    });

    const data = response.text ? parseJSONResponse(response.text) : {};
    
    const recommendations: TravelRecommendation[] = data.recommendations || [];
    
    // Process grounding chunks
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources = groundingChunks.map((c: any) => {
        if (c.web) return { title: c.web.title, uri: c.web.uri };
        if (c.maps) return { title: c.maps.title || 'Google Maps', uri: c.maps.googleMapsUri || c.maps.uri }; 
        return null;
    }).filter((s: any) => s && s.uri);

    if (recommendations.length > 0 && sources.length > 0) {
        recommendations.forEach((rec, index) => {
            if (index === 0) rec.sources = sources.slice(0, 3);
        });
    }

    return {
      id: Date.now().toString(),
      destination,
      dates: `${startDate} - ${endDate}`,
      startDate,
      endDate,
      airlinePolicy: data.airlinePolicy || "",
      recommendations: recommendations.map(r => ({...r, checked: false})),
      weatherAlert: data.weatherAlert,
    };
  } catch (error) {
    console.error("Trip planning failed:", error);
    throw error;
  }
};