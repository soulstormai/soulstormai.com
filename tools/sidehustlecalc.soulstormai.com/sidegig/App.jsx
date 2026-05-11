import React, { useState, useEffect } from 'react';

const motivationalQuotes = [
  { quote: "Every expert was once a beginner.", author: "Helen Hayes" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Small steps every day lead to big results.", author: "Unknown" },
  { quote: "Your current situation is not your final destination.", author: "Unknown" },
  { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { quote: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { quote: "Difficult roads often lead to beautiful destinations.", author: "Unknown" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

const getRandomQuote = () => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

const sideHustles = [
  {
    id: 'doordash',
    name: 'DoorDash',
    icon: 'DD',
    category: 'Delivery',
    baseHourly: 18,
    platformFee: 0,
    requiresCar: true,
    startupCost: 0,
    gasCostPerHour: 4,
    wearCostPerHour: 2,
    skillsNeeded: [],
    description: 'Food delivery',
    affiliateLink: null,
    signUpUrl: 'https://doordash.com/dasher/signup',
    requirements: ['18+ years old', 'Valid driver\'s license', 'Car, bike, or scooter', 'Smartphone', 'Pass background check'],
    howToStart: 'Download the Dasher app, complete signup, pass background check (1-2 weeks), then start accepting deliveries.',
    proTips: 'Work during lunch (11am-2pm) and dinner (5pm-9pm) rushes. Accept orders $6+ or $2/mile minimum.',
    paymentFrequency: 'Weekly direct deposit, or instant with DasherDirect'
  },
  {
    id: 'uber',
    name: 'Uber/Lyft',
    icon: 'UL',
    category: 'Rideshare',
    baseHourly: 22,
    platformFee: 0.25,
    requiresCar: true,
    startupCost: 0,
    gasCostPerHour: 5,
    wearCostPerHour: 3,
    skillsNeeded: [],
    description: 'Rideshare driving',
    affiliateLink: 'https://drivers.uber.com/i/u9zpq8d',
    signUpUrl: 'https://drivers.uber.com',
    requirements: ['21+ years old', 'Valid driver\'s license (1+ year)', 'Car less than 15 years old', '4-door vehicle', 'Pass background & vehicle inspection'],
    howToStart: 'Sign up online, upload documents, pass background check (3-10 days), complete vehicle inspection, then go online.',
    proTips: 'Airport pickups and weekend nights pay best. Use destination filter for trips toward home.',
    paymentFrequency: 'Weekly, or instant cashout for $0.85 fee'
  },
  {
    id: 'instacart',
    name: 'Instacart',
    icon: 'IC',
    category: 'Delivery',
    baseHourly: 16,
    platformFee: 0,
    requiresCar: true,
    startupCost: 0,
    gasCostPerHour: 3,
    wearCostPerHour: 1.5,
    skillsNeeded: [],
    description: 'Grocery shopping & delivery',
    affiliateLink: null,
    signUpUrl: 'https://shoppers.instacart.com',
    requirements: ['18+ years old', 'Smartphone', 'Car (for delivery)', 'Able to lift 40+ lbs', 'Pass background check'],
    howToStart: 'Apply on Shopper app, complete onboarding, pass background check, then accept batches.',
    proTips: 'Costco and high-end grocery stores have bigger tips. Shop fast but check expiration dates.',
    paymentFrequency: 'Weekly, or instant cashout available'
  },
  {
    id: 'etsy',
    name: 'Etsy Shop',
    icon: 'ET',
    category: 'E-commerce',
    baseHourly: 25,
    platformFee: 0.12,
    requiresCar: false,
    startupCost: 50,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: ['creative'],
    description: 'Sell handmade or digital items',
    affiliateLink: null,
    signUpUrl: 'https://etsy.com/sell',
    requirements: ['Bank account', 'Product to sell (handmade, vintage, or digital)', 'Photos of products', 'PayPal or credit card for fees'],
    howToStart: 'Create Etsy account, set up shop name, add listings with photos and descriptions, connect payment method.',
    proTips: 'Digital downloads (printables, templates) = passive income. Use all 13 tags. Good photos = more sales.',
    paymentFrequency: 'Daily deposits available, default is weekly'
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    icon: 'FV',
    category: 'Freelance',
    baseHourly: 30,
    platformFee: 0.20,
    requiresCar: false,
    startupCost: 0,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: ['creative', 'technical', 'writing'],
    description: 'Freelance services',
    affiliateLink: 'https://www.fiverr.com/pe/99ZKZZK',
    signUpUrl: 'https://www.fiverr.com/start_selling',
    requirements: ['PayPal or bank account', 'Skill to offer (writing, design, video, etc.)', 'Profile photo', 'Portfolio samples'],
    howToStart: 'Create seller profile, set up 3-7 gigs with clear descriptions and pricing tiers, add portfolio images.',
    proTips: 'Start with competitive prices to get reviews. Offer 3 pricing tiers. Fast response time boosts ranking.',
    paymentFrequency: '14 days after order completion, then withdraw anytime'
  },
  {
    id: 'upwork',
    name: 'Upwork',
    icon: 'UP',
    category: 'Freelance',
    baseHourly: 35,
    platformFee: 0.10,
    requiresCar: false,
    startupCost: 0,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: ['technical', 'writing'],
    description: 'Professional freelancing',
    affiliateLink: null,
    signUpUrl: 'https://www.upwork.com/freelance-jobs',
    requirements: ['Professional skill', 'Portfolio or work samples', 'Verified ID', 'Bank account or PayPal'],
    howToStart: 'Apply for Upwork account (approval takes 1-3 days), create detailed profile, submit proposals to jobs.',
    proTips: 'Specialize in a niche. Personalized proposals win. Start with fixed-price projects to build reviews.',
    paymentFrequency: 'Weekly with 5-day security period'
  },
  {
    id: 'tutoring',
    name: 'Online Tutoring',
    icon: 'TU',
    category: 'Teaching',
    baseHourly: 25,
    platformFee: 0.15,
    requiresCar: false,
    startupCost: 0,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: ['teaching'],
    description: 'Teach subjects online',
    affiliateLink: null,
    signUpUrl: 'https://www.wyzant.com/tutor/apply',
    requirements: ['Expertise in a subject', 'Computer with webcam', 'Reliable internet', 'Pass background check'],
    howToStart: 'Apply on Wyzant, Tutor.com, or Varsity Tutors. Create profile, set rates, pass background check.',
    proTips: 'SAT/ACT prep and coding pay highest. Get certified in your subject for higher rates.',
    paymentFrequency: 'Weekly direct deposit',
    altPlatforms: ['Tutor.com', 'Varsity Tutors', 'Preply']
  },
  {
    id: 'taskrabbit',
    name: 'TaskRabbit',
    icon: 'TR',
    category: 'Services',
    baseHourly: 28,
    platformFee: 0.15,
    requiresCar: true,
    startupCost: 0,
    gasCostPerHour: 2,
    wearCostPerHour: 0,
    skillsNeeded: [],
    description: 'Handyman & odd jobs',
    affiliateLink: null,
    signUpUrl: 'https://www.taskrabbit.com/become-a-tasker',
    requirements: ['18+ years old', 'Smartphone', 'Own tools (for applicable tasks)', 'Pass background check', '$25 registration fee in some cities'],
    howToStart: 'Apply online, select task categories, set hourly rates, complete background check, attend virtual orientation.',
    proTips: 'IKEA assembly and moving help are most in-demand. Build reviews fast by starting with lower rates.',
    paymentFrequency: 'Direct deposit after task completion'
  },
  {
    id: 'rover',
    name: 'Rover',
    icon: 'RV',
    category: 'Pet Care',
    baseHourly: 20,
    platformFee: 0.20,
    requiresCar: false,
    startupCost: 0,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: [],
    description: 'Dog walking & pet sitting',
    affiliateLink: null,
    signUpUrl: 'https://www.rover.com/become-a-sitter/',
    requirements: ['18+ years old', 'Love for animals', 'Pass background check', 'Pet-friendly home (for boarding)'],
    howToStart: 'Create sitter profile with photos, set services and rates, pass background check, start accepting bookings.',
    proTips: 'Offer dog boarding for $50-80/night. Good photos and reviews are everything. Respond within 1 hour.',
    paymentFrequency: '2 days after booking completed, via PayPal or check'
  },
  {
    id: 'amazon-flex',
    name: 'Amazon Flex',
    icon: 'AF',
    category: 'Delivery',
    baseHourly: 20,
    platformFee: 0,
    requiresCar: true,
    startupCost: 0,
    gasCostPerHour: 4,
    wearCostPerHour: 2,
    skillsNeeded: [],
    description: 'Amazon package delivery',
    affiliateLink: null,
    signUpUrl: 'https://flex.amazon.com',
    requirements: ['21+ years old', 'Valid driver\'s license', 'Mid-size or larger vehicle', 'Smartphone', 'Pass background check'],
    howToStart: 'Download Amazon Flex app, apply with driver\'s license, wait for approval (can take weeks), grab delivery blocks.',
    proTips: 'Whole Foods blocks pay best. Refresh app constantly for "surge" blocks at higher rates.',
    paymentFrequency: 'Twice weekly via direct deposit'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'YT',
    category: 'Content',
    baseHourly: 15,
    platformFee: 0.45,
    requiresCar: false,
    startupCost: 100,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: ['creative'],
    description: 'Video content creation',
    affiliateLink: null,
    signUpUrl: 'https://www.youtube.com/channel/create',
    requirements: ['Google account', 'Camera or smartphone', 'Video editing software', '1,000 subscribers + 4,000 watch hours for monetization'],
    howToStart: 'Create channel, pick a niche, post consistently (2-3x/week), apply for Partner Program at 1K subs.',
    proTips: 'Tutorials and "how-to" videos get steady views. First 48 hours are critical for algorithm. Use end screens.',
    paymentFrequency: 'Monthly via AdSense (once you hit $100 threshold)'
  },
  {
    id: 'print-on-demand',
    name: 'Print on Demand',
    icon: 'PD',
    category: 'E-commerce',
    baseHourly: 20,
    platformFee: 0.15,
    requiresCar: false,
    startupCost: 0,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: ['creative'],
    description: 'Sell custom designs on products',
    affiliateLink: null,
    signUpUrl: 'https://www.printful.com/start',
    requirements: ['Design skills or Canva', 'E-commerce platform (Etsy, Shopify)', 'Bank account'],
    howToStart: 'Create account on Printful/Printify, connect to Etsy or Shopify, upload designs, set prices.',
    proTips: 'Niche designs sell better than generic. T-shirts and mugs are most popular. Use mockup generators.',
    paymentFrequency: 'Depends on platform (Etsy: weekly, Shopify: daily)',
    altPlatforms: ['Printify', 'Redbubble', 'TeeSpring']
  },
  {
    id: 'transcription',
    name: 'Transcription',
    icon: 'TX',
    category: 'Freelance',
    baseHourly: 18,
    platformFee: 0,
    requiresCar: false,
    startupCost: 0,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: ['writing'],
    description: 'Convert audio to text',
    affiliateLink: null,
    signUpUrl: 'https://www.rev.com/freelancers',
    requirements: ['Fast typing (60+ WPM)', 'Good grammar', 'Computer', 'Headphones', 'Pass transcription test'],
    howToStart: 'Apply on Rev or TranscribeMe, pass grammar and transcription tests, start claiming jobs.',
    proTips: 'Legal and medical transcription pay more but need certification. Use foot pedal for faster work.',
    paymentFrequency: 'Weekly via PayPal',
    altPlatforms: ['TranscribeMe', 'GoTranscript', 'Scribie']
  },
  {
    id: 'dropshipping',
    name: 'Dropshipping',
    icon: 'DS',
    category: 'E-commerce',
    baseHourly: 25,
    platformFee: 0.03,
    requiresCar: false,
    startupCost: 200,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: ['technical'],
    description: 'Sell products without inventory',
    affiliateLink: 'https://shopify.pxf.io/jeNZea',
    signUpUrl: 'https://www.shopify.com/dropshipping',
    requirements: ['Shopify or WooCommerce store', 'Supplier (AliExpress, Spocket)', 'Marketing budget', 'Business email'],
    howToStart: 'Set up Shopify store, find products on DSers/Spocket, import to store, run Facebook/TikTok ads.',
    proTips: 'Test products with small ad spend first. Focus on problem-solving products. Build an email list.',
    paymentFrequency: 'Shopify Payments: 2-3 business days',
    warning: 'High failure rate. Expect to spend $200-500 testing before profit.'
  },
  {
    id: 'user-testing',
    name: 'UserTesting',
    icon: 'UT',
    category: 'Freelance',
    baseHourly: 30,
    platformFee: 0,
    requiresCar: false,
    startupCost: 0,
    gasCostPerHour: 0,
    wearCostPerHour: 0,
    skillsNeeded: [],
    description: 'Test websites and apps',
    affiliateLink: null,
    signUpUrl: 'https://www.usertesting.com/get-paid-to-test',
    requirements: ['Computer or smartphone', 'Microphone', 'Reliable internet', 'Pass sample test'],
    howToStart: 'Sign up at UserTesting.com, complete practice test, get approved, then claim available tests ($4-10 each, 10-20 min).',
    proTips: 'Check for tests frequently — they fill fast. Speak thoughts aloud clearly. Also try UserZoom, TryMyUI.',
    paymentFrequency: '7 days after test, via PayPal',
    altPlatforms: ['UserZoom.com', 'TryMyUI.com', 'Userlytics.com', 'TestingTime.com']
  }
];

export default function SideHustleCalculator() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({
    hoursPerWeek: 10,
    hasCar: null,
    skills: [],
    citySize: 'medium',
    startupBudget: 100
  });
  const [results, setResults] = useState([]);
  const [selectedHustle, setSelectedHustle] = useState(null);
  const [quote] = useState(getRandomQuote());
  const [resultsQuote] = useState(getRandomQuote());
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, [step]);

  const calculateResults = () => {
    const cityMultiplier = { small: 0.8, medium: 1, large: 1.25 }[inputs.citySize];
    
    const calculated = sideHustles
      .filter(hustle => {
        if (hustle.requiresCar && inputs.hasCar === false) return false;
        if (hustle.startupCost > inputs.startupBudget) return false;
        return true;
      })
      .map(hustle => {
        let baseRate = hustle.baseHourly * cityMultiplier;
        
        const hasRelevantSkill = hustle.skillsNeeded.length === 0 || 
          hustle.skillsNeeded.some(skill => inputs.skills.includes(skill));
        if (hasRelevantSkill && hustle.skillsNeeded.length > 0) {
          baseRate *= 1.15;
        }
        
        const afterFees = baseRate * (1 - hustle.platformFee);
        const netHourly = afterFees - hustle.gasCostPerHour - hustle.wearCostPerHour;
        const taxRate = 0.25;
        const takeHome = netHourly * (1 - taxRate);
        
        return {
          ...hustle,
          grossHourly: baseRate,
          netHourly: takeHome,
          weeklyEarnings: takeHome * inputs.hoursPerWeek,
          monthlyEarnings: takeHome * inputs.hoursPerWeek * 4,
          yearlyEarnings: takeHome * inputs.hoursPerWeek * 52
        };
      })
      .sort((a, b) => b.netHourly - a.netHourly);
    
    setResults(calculated);
    setStep(5);
  };

  // App Icon Component - uses the PNG image
  const AppIcon = ({ size = 100 }) => (
    <img 
      src="/sidegig-logo.png" 
      alt="SideGig Calculator"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size * 0.22}px`,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
      }}
    />
  );

  // Styled components
  const Button = ({ onClick, children, variant = 'primary', disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '18px 24px',
        border: variant === 'secondary' ? '1px solid rgba(255,255,255,0.15)' : 'none',
        borderRadius: '16px',
        background: variant === 'primary' 
          ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
          : 'transparent',
        color: variant === 'primary' ? '#1c1917' : '#fff',
        fontSize: '17px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'inherit',
        letterSpacing: '-0.01em',
        boxShadow: variant === 'primary' ? '0 8px 32px rgba(251, 191, 36, 0.25)' : 'none'
      }}
    >
      {children}
    </button>
  );

  const ProgressBar = ({ current, total }) => (
    <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '32px'
    }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          flex: 1,
          height: '4px',
          borderRadius: '2px',
          background: i < current 
            ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
            : 'rgba(255,255,255,0.1)',
          transition: 'all 0.4s ease'
        }} />
      ))}
    </div>
  );

  const OptionButton = ({ selected, onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '20px 24px',
        border: selected ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        background: selected 
          ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)'
          : 'rgba(255,255,255,0.02)',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        fontFamily: 'inherit',
        textAlign: 'left'
      }}
    >
      {children}
    </button>
  );

  const SkillChip = ({ skill, label, selected }) => (
    <button
      onClick={() => {
        setInputs(prev => ({
          ...prev,
          skills: selected 
            ? prev.skills.filter(s => s !== skill)
            : [...prev.skills, skill]
        }));
      }}
      style={{
        padding: '14px 20px',
        border: selected ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        background: selected 
          ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)'
          : 'rgba(255,255,255,0.02)',
        color: selected ? '#fbbf24' : 'rgba(255,255,255,0.8)',
        fontSize: '15px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        fontFamily: 'inherit'
      }}
    >
      {label}
    </button>
  );

  const ResultCard = ({ hustle, rank }) => (
    <div
      onClick={() => setSelectedHustle(hustle)}
      style={{
        background: rank === 1 
          ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.12) 0%, rgba(245, 158, 11, 0.06) 100%)'
          : 'rgba(255,255,255,0.02)',
        border: rank === 1 ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {rank === 1 && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          color: '#1c1917',
          fontSize: '11px',
          fontWeight: '700',
          padding: '4px 10px',
          borderRadius: '20px',
          letterSpacing: '0.02em'
        }}>
          BEST MATCH
        </div>
      )}
      
      {hustle.affiliateLink && (
        <div style={{
          position: 'absolute',
          top: rank === 1 ? '40px' : '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
          color: '#fff',
          fontSize: '10px',
          fontWeight: '600',
          padding: '4px 8px',
          borderRadius: '20px'
        }}>
          BONUS
        </div>
      )}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: '800',
          color: '#1c1917',
          boxShadow: '0 4px 12px rgba(251, 191, 36, 0.25)'
        }}>
          {hustle.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>{hustle.name}</h3>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{hustle.category}</p>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'baseline',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '12px',
        padding: '14px 16px'
      }}>
        <div>
          <span style={{ fontSize: '28px', fontWeight: '700', color: '#fbbf24' }}>
            ${hustle.netHourly.toFixed(0)}
          </span>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginLeft: '4px' }}>/hr</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
            ${hustle.weeklyEarnings.toFixed(0)}/week
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            ${hustle.monthlyEarnings.toFixed(0)}/month
          </div>
        </div>
      </div>
    </div>
  );

  // Detail Modal
  const DetailModal = ({ hustle, onClose }) => (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(20px)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #1c1917 0%, #0f0e0d 100%)',
        minHeight: '100%',
        padding: '24px'
      }}>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            fontSize: '14px',
            padding: '10px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            marginBottom: '24px',
            fontFamily: 'inherit'
          }}
        >
          ← Back
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: '800',
            color: '#1c1917',
            boxShadow: '0 8px 24px rgba(251, 191, 36, 0.3)'
          }}>
            {hustle.icon}
          </div>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '4px' }}>{hustle.name}</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)' }}>{hustle.category} • {hustle.description}</p>
          </div>
        </div>

        {/* Earnings Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '12px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Weekly', value: hustle.weeklyEarnings },
            { label: 'Monthly', value: hustle.monthlyEarnings },
            { label: 'Yearly', value: hustle.yearlyEarnings }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.15)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#fbbf24' }}>
                ${item.value.toFixed(0)}
              </div>
            </div>
          ))}
        </div>

        {/* Info Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '12px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              How to Start
            </div>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              {hustle.howToStart}
            </p>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Requirements
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '14px' }}>
              {hustle.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '12px', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pro Tips
            </div>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              {hustle.proTips}
            </p>
          </div>

          {hustle.altPlatforms && (
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Similar Platforms
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {hustle.altPlatforms.map((platform, i) => (
                  <span key={i} style={{
                    background: 'rgba(255,255,255,0.08)',
                    padding: '8px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)'
                  }}>{platform}</span>
                ))}
              </div>
            </div>
          )}

          {hustle.warning && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '16px',
              padding: '16px 20px',
              fontSize: '14px',
              color: '#fca5a5',
              lineHeight: 1.5
            }}>
              <strong style={{ color: '#f87171' }}>Heads up:</strong> {hustle.warning}
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '16px 20px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Payment</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>{hustle.paymentFrequency}</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            padding: '16px 20px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Startup Cost</span>
            <span style={{ fontSize: '14px', fontWeight: '600', color: hustle.startupCost === 0 ? '#10b981' : '#fbbf24' }}>
              {hustle.startupCost === 0 ? 'Free' : `$${hustle.startupCost}`}
            </span>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <a
            href={hustle.affiliateLink || hustle.signUpUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              width: '100%',
              padding: '18px',
              background: hustle.affiliateLink 
                ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)'
                : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              border: 'none',
              borderRadius: '16px',
              color: '#fff',
              fontSize: '17px',
              fontWeight: '600',
              textAlign: 'center',
              textDecoration: 'none',
              boxShadow: hustle.affiliateLink 
                ? '0 8px 32px rgba(168, 85, 247, 0.3)'
                : '0 8px 32px rgba(251, 191, 36, 0.25)'
            }}
          >
            {hustle.affiliateLink ? 'Sign Up & Get Bonus' : 'Get Started'}
          </a>
        </div>
      </div>
    </div>
  );

  // Page wrapper with consistent styling
  const PageWrapper = ({ children }) => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1c1917 0%, #0f0e0d 50%, #1c1917 100%)',
      color: '#fff',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '0 0 40px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '150%',
        height: '60%',
        background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.06) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );

  // Welcome Screen
  if (step === 0) {
    return (
      <PageWrapper>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '40px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            animation: 'fadeInUp 0.8s ease-out',
            marginBottom: '40px'
          }}>
            <AppIcon size={120} />
          </div>
          
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 50%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            SideGig<br/>Calculator
          </h1>
          
          <p style={{ 
            fontSize: '17px', 
            color: 'rgba(255,255,255,0.5)', 
            lineHeight: 1.6,
            maxWidth: '280px',
            marginBottom: '32px'
          }}>
            Find the perfect side hustle for your situation. Real earnings, honest numbers.
          </p>

          <div style={{
            background: 'rgba(251, 191, 36, 0.06)',
            border: '1px solid rgba(251, 191, 36, 0.12)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '40px',
            maxWidth: '320px'
          }}>
            <p style={{ 
              fontSize: '17px', 
              fontStyle: 'italic', 
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '12px',
              lineHeight: 1.6
            }}>
              "{quote.quote}"
            </p>
            <p style={{ 
              fontSize: '13px', 
              color: '#fbbf24',
              fontWeight: '500'
            }}>
              — {quote.author}
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px', 
            width: '100%', 
            maxWidth: '320px',
            marginBottom: '40px'
          }}>
            {[
              { num: '01', text: 'Answer 4 quick questions' },
              { num: '02', text: 'Compare 15+ side hustles' },
              { num: '03', text: 'See your real take-home pay' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <span style={{ 
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#fbbf24',
                  letterSpacing: '0.02em'
                }}>{item.num}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>{item.text}</span>
              </div>
            ))}
          </div>
          
          <div style={{ width: '100%', maxWidth: '320px' }}>
            <Button onClick={() => setStep(1)}>Get Started</Button>
          </div>
        </div>
        
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </PageWrapper>
    );
  }

  // Step 1: Hours
  if (step === 1) {
    return (
      <PageWrapper>
        <div style={{ padding: '60px 24px 40px' }}>
          <ProgressBar current={1} total={4} />
          
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}>
            How many hours per week?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '40px' }}>
            Be realistic — even a few hours can add up
          </p>

          <div style={{ marginBottom: '48px' }}>
            <div style={{ 
              fontSize: '64px', 
              fontWeight: '700', 
              textAlign: 'center',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {inputs.hoursPerWeek}
            </div>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              hours per week
            </div>
          </div>

          <input
            type="range"
            min="5"
            max="40"
            value={inputs.hoursPerWeek}
            onChange={(e) => setInputs(prev => ({ ...prev, hoursPerWeek: parseInt(e.target.value) }))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${((inputs.hoursPerWeek - 5) / 35) * 100}%, rgba(255,255,255,0.1) ${((inputs.hoursPerWeek - 5) / 35) * 100}%, rgba(255,255,255,0.1) 100%)`,
              appearance: 'none',
              cursor: 'pointer',
              marginBottom: '48px'
            }}
          />

          <div style={{
            background: 'rgba(251, 191, 36, 0.06)',
            border: '1px solid rgba(251, 191, 36, 0.1)',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '40px'
          }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
              Even 5-10 hours/week can add up to <span style={{ color: '#fbbf24', fontWeight: '600' }}>$500+/month</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
            <Button onClick={() => setStep(2)}>Continue</Button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Step 2: Car
  if (step === 2) {
    return (
      <PageWrapper>
        <div style={{ padding: '60px 24px 40px' }}>
          <ProgressBar current={2} total={4} />
          
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}>
            Do you have a car?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
            This opens up delivery and rideshare options
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <OptionButton 
              selected={inputs.hasCar === true} 
              onClick={() => setInputs(prev => ({ ...prev, hasCar: true }))}
            >
              Yes, I have access to a car
            </OptionButton>
            <OptionButton 
              selected={inputs.hasCar === false} 
              onClick={() => setInputs(prev => ({ ...prev, hasCar: false }))}
            >
              No, remote work only
            </OptionButton>
          </div>

          <div style={{
            background: 'rgba(251, 191, 36, 0.06)',
            border: '1px solid rgba(251, 191, 36, 0.1)',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '40px'
          }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
              No car? No problem — many top hustles are <span style={{ color: '#fbbf24', fontWeight: '600' }}>100% remote</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)} disabled={inputs.hasCar === null}>Continue</Button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Step 3: Skills
  if (step === 3) {
    return (
      <PageWrapper>
        <div style={{ padding: '60px 24px 40px' }}>
          <ProgressBar current={3} total={4} />
          
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}>
            Any special skills?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
            Select all that apply — or skip if none
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
            <SkillChip skill="creative" label="Creative / Design" selected={inputs.skills.includes('creative')} />
            <SkillChip skill="technical" label="Tech / Coding" selected={inputs.skills.includes('technical')} />
            <SkillChip skill="teaching" label="Teaching" selected={inputs.skills.includes('teaching')} />
            <SkillChip skill="writing" label="Writing" selected={inputs.skills.includes('writing')} />
          </div>

          <div style={{
            background: 'rgba(251, 191, 36, 0.06)',
            border: '1px solid rgba(251, 191, 36, 0.1)',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '40px'
          }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
              No special skills? You can still earn <span style={{ color: '#fbbf24', fontWeight: '600' }}>$15-25/hr</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={() => setStep(4)}>Continue</Button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Step 4: City & Budget
  if (step === 4) {
    return (
      <PageWrapper>
        <div style={{ padding: '60px 24px 40px' }}>
          <ProgressBar current={4} total={4} />
          
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            marginBottom: '12px',
            letterSpacing: '-0.02em'
          }}>
            Almost there!
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
            Just a couple more details
          </p>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              fontSize: '14px', 
              color: 'rgba(255,255,255,0.6)', 
              display: 'block', 
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: '500'
            }}>
              City Size
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { value: 'small', label: 'Small town (under 100k)' },
                { value: 'medium', label: 'Mid-size city (100k - 500k)' },
                { value: 'large', label: 'Major metro (500k+)' }
              ].map(option => (
                <OptionButton
                  key={option.value}
                  selected={inputs.citySize === option.value}
                  onClick={() => setInputs(prev => ({ ...prev, citySize: option.value }))}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ 
              fontSize: '14px', 
              color: 'rgba(255,255,255,0.6)', 
              display: 'block', 
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: '500'
            }}>
              Startup Budget
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { value: 0, label: '$0 — I need free options' },
                { value: 100, label: 'Up to $100' },
                { value: 500, label: 'Up to $500' }
              ].map(option => (
                <OptionButton
                  key={option.value}
                  selected={inputs.startupBudget === option.value}
                  onClick={() => setInputs(prev => ({ ...prev, startupBudget: option.value }))}
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(251, 191, 36, 0.06)',
            border: '1px solid rgba(251, 191, 36, 0.1)',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '40px'
          }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
              Many hustles need <span style={{ color: '#fbbf24', fontWeight: '600' }}>$0 to start</span>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
            <Button onClick={calculateResults}>See My Results</Button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Results
  if (step === 5) {
    return (
      <PageWrapper>
        {selectedHustle && (
          <DetailModal hustle={selectedHustle} onClose={() => setSelectedHustle(null)} />
        )}
        
        <div style={{ padding: '60px 24px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <AppIcon size={64} />
          </div>
          
          <div style={{
            background: 'rgba(251, 191, 36, 0.06)',
            border: '1px solid rgba(251, 191, 36, 0.12)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '15px', 
              fontStyle: 'italic', 
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '8px'
            }}>
              "{resultsQuote.quote}"
            </p>
            <p style={{ fontSize: '12px', color: '#fbbf24' }}>— {resultsQuote.author}</p>
          </div>

          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            Your Top Matches
          </h2>
          <p style={{ 
            fontSize: '14px', 
            color: 'rgba(255,255,255,0.5)', 
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Based on {inputs.hoursPerWeek} hrs/week
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {results.slice(0, 8).map((hustle, i) => (
              <ResultCard key={hustle.id} hustle={hustle} rank={i + 1} />
            ))}
          </div>

          <Button variant="secondary" onClick={() => { setStep(0); setResults([]); }}>
            Start Over
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return null;
}
