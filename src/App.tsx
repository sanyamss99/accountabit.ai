import React, { useState, useEffect } from 'react';
import EmailSignupModal from './components/EmailSignupModal';
import AdminPanel from './components/AdminPanel';
import { 
  Target, 
  TrendingUp, 
  Zap, 
  Shield, 
  ChevronRight, 
  Play,
  Star,
  CheckCircle,
  ArrowRight,
  Brain,
  Calendar,
  MessageSquare,
  Trophy,
  Rocket,
  Users,
  Phone,
  Clock,
  CheckSquare,
  BarChart3,
  Lightbulb,
  Bell,
  Smartphone,
  Activity,
  Flame,
  Dumbbell,
  Crown,
  Sword,
  Sparkles,
  Diamond,
  Award,
  Zap as Lightning,
  Headphones,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    source: string;
    title: string;
    description: string;
  }>({
    isOpen: false,
    source: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Feature rotation
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 4000);

    // Scroll tracking for parallax
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Admin panel toggle (Ctrl+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdminPanel(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(featureInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openModal = (source: string, title: string, description: string) => {
    setModalState({
      isOpen: true,
      source,
      title,
      description
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const features = [
    {
      icon: Phone,
      title: "Proactive AI Coaching",
      description: "Your AI coach calls you, checks in, and provides real-time guidance to keep you on track toward your goals.",
      color: "text-blue-600"
    },
    {
      icon: Target,
      title: "Smart Goal Breakdown",
      description: "Transform overwhelming objectives into clear, actionable daily tasks that build unstoppable momentum.",
      color: "text-green-600"
    },
    {
      icon: BarChart3,
      title: "Intelligent Progress Tracking",
      description: "Advanced analytics provide insights into your patterns, helping optimize your path to success.",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Accountability That Works",
      description: "Gentle but persistent accountability that adapts to your style and ensures consistent progress.",
      color: "text-indigo-600"
    }
  ];

  const problems = [
    {
      icon: TrendingDown,
      title: "Feeling Overwhelmed",
      description: "Big goals feel impossible to tackle. You know what you want but don't know where to start.",
      stat: "78%",
      statLabel: "feel overwhelmed by goals"
    },
    {
      icon: AlertTriangle,
      title: "Starting But Not Finishing",
      description: "You begin with enthusiasm but lose momentum. Your history of unfinished goals affects your confidence.",
      stat: "92%",
      statLabel: "abandon their goals"
    },
    {
      icon: Activity,
      title: "Scattered Progress",
      description: "Multiple goals across different apps and systems. No single place to see your complete picture.",
      stat: "85%",
      statLabel: "lack unified tracking"
    },
    {
      icon: Clock,
      title: "No Real Accountability",
      description: "You're accountable to everyone except yourself. Without external support, it's easy to make excuses.",
      stat: "67%",
      statLabel: "need accountability"
    }
  ];

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Share Your Vision",
      description: "Tell us your goals and aspirations. Our AI understands your unique situation and creates a personalized plan.",
      number: "01"
    },
    {
      icon: Target,
      title: "Get Your Roadmap",
      description: "Receive a clear breakdown of daily actions that move you closer to your goals, one step at a time.",
      number: "02"
    },
    {
      icon: Phone,
      title: "Stay Connected",
      description: "Your AI coach checks in regularly, celebrates wins, and helps you navigate challenges as they arise.",
      number: "03"
    },
    {
      icon: Trophy,
      title: "Achieve Success",
      description: "Watch as consistent daily actions compound into remarkable results and lasting positive change.",
      number: "04"
    }
  ];

  const stats = [
    { value: "94%", label: "Success Rate", icon: Trophy },
    { value: "24/7", label: "AI Support", icon: Headphones },
    { value: "Soon", label: "Launch Date", icon: Target },
    { value: "Beta", label: "Early Access", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #36454F 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Accountability Coaching
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
                <span className="text-gray-900">accountabit</span>
                <span className="text-blue-600">.ai</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-light leading-relaxed">
                Your intelligent accountability partner that
                <span className="block font-medium text-gray-900">
                  turns goals into achievements
                </span>
              </p>
              
              <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
                Stop struggling alone. Get proactive AI coaching that breaks down your biggest goals 
                into manageable daily actions and keeps you accountable every step of the way.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
                onClick={() => openModal(
                  'hero-cta',
                  'Start Your Success Journey',
                  'Get ready to transform your goals into achievements with AI-powered accountability coaching.'
                )}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              
              <button 
                onClick={() => openModal(
                  'hero-demo',
                  'See How It Works',
                  'Get a personalized demo of how our AI accountability coach will help you achieve your goals.'
                )}
                className="group flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-gray-100 hover:bg-blue-50 rounded-full flex items-center justify-center transition-colors duration-300">
                  <Play className="w-5 h-5 ml-0.5" />
                </div>
                <span className="font-medium">See How It Works</span>
              </button>
            </div>
          </div>
          
          {/* Clean AI Visualization */}
          <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative mx-auto w-80 h-80 mb-16">
              {/* Outer ring */}
              <div className="absolute inset-0 border-2 border-blue-100 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
              <div className="absolute inset-4 border border-gray-200 rounded-full animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
              
              {/* Central brain */}
              <div className="absolute inset-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border-2 border-blue-200 shadow-lg">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>
              
              {/* Floating icons */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200 animate-bounce">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200 animate-bounce" style={{animationDelay: '1s'}}>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <div className="absolute top-1/2 left-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200 animate-bounce" style={{animationDelay: '2s'}}>
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="absolute top-1/2 right-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200 animate-bounce" style={{animationDelay: '0.5s'}}>
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-900/20 text-red-400 rounded-full text-sm font-medium mb-8">
              <AlertTriangle className="w-4 h-4 mr-2" />
              The Goal Achievement Crisis
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Why Most Goals
              <span className="block text-red-400">Never Get Achieved</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              You're not alone in struggling with goal achievement. Research shows that 92% of people 
              never achieve their goals. Here's why traditional approaches fail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-red-900/20 rounded-lg flex items-center justify-center">
                    <problem.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-400">{problem.stat}</div>
                    <div className="text-gray-400 text-sm">{problem.statLabel}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{problem.title}</h3>
                <p className="text-gray-300 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>

          {/* The Cost */}
          <div className="text-center bg-gray-800 p-12 rounded-2xl border border-gray-700">
            <div className="w-16 h-16 mx-auto bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-red-400" />
            </div>
            
            <h3 className="text-3xl font-bold mb-6 text-red-400">The Cost of Inaction</h3>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Every day without a proven system, you're not just standing still—you're falling behind. 
              Your potential remains untapped while others move forward with clear direction.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">365</div>
                <div className="text-gray-400">Days of Lost Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">∞</div>
                <div className="text-gray-400">Missed Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">92%</div>
                <div className="text-gray-400">Failure Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Intelligent Solution
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-gray-900">
              How accountabit.ai
              <span className="block text-blue-600">Changes Everything</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our AI doesn't just track your goals—it actively coaches you toward success with 
              personalized guidance and proactive accountability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 bg-gray-50 rounded-xl border-2 transition-all duration-500 hover:scale-105 ${
                  currentFeature === index 
                    ? 'border-blue-200 shadow-xl bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                  currentFeature === index
                    ? 'bg-blue-600 scale-110'
                    : 'bg-gray-200 group-hover:bg-blue-100'
                }`}>
                  <feature.icon className={`w-8 h-8 ${
                    currentFeature === index ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                  }`} />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-8">
              <Rocket className="w-4 h-4 mr-2" />
              Simple Process
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-gray-900">
              Your Path to
              <span className="block text-green-600">Success</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is simple. Our AI guides you through every step of your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Connection line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gray-300 z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className="w-32 h-32 mx-auto bg-white border-4 border-gray-200 rounded-full flex items-center justify-center mb-6 shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium mb-8">
              <Users className="w-4 h-4 mr-2" />
              Join the Waitlist
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Be Among the First to Experience
              <span className="block text-purple-600">AI-Powered Accountability</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              accountabit.ai is launching soon. Join our exclusive waitlist to get early access 
              and be the first to transform your goals into achievements.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-12 rounded-2xl border border-purple-200">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-6">
                  <Bell className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Get Early Access</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Be the first to know when accountabit.ai launches. Early waitlist members get 
                  exclusive benefits and priority access.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Early Access</h4>
                  <p className="text-gray-600 text-sm">Be among the first to use the platform</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Diamond className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Special Pricing</h4>
                  <p className="text-gray-600 text-sm">Exclusive launch discount for waitlist members</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Beta Features</h4>
                  <p className="text-gray-600 text-sm">Access to exclusive features and updates</p>
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => openModal(
                    'waitlist-signup',
                    'Join the Waitlist',
                    'Get early access to accountabit.ai and be the first to experience AI-powered accountability coaching.'
                  )}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    Join the Waitlist
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
                
                <p className="text-gray-500 text-sm mt-4">
                  Join <span className="font-semibold text-purple-600">2,847</span> others waiting for launch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Ready to Turn Your Goals
              <span className="block text-blue-400">Into Achievements?</span>
            </h2>
          </div>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands who've transformed their lives with intelligent accountability. 
            Your AI coach is ready to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button 
              onClick={() => openModal(
                'cta-trial',
                'Start Your Free Trial',
                'Begin your 14-day free trial and experience the power of AI-driven accountability coaching.'
              )}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-3">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
            
            <button 
              onClick={() => openModal(
                'cta-demo',
                'Schedule Your Demo',
                'Book a personalized consultation to see how accountabit.ai can transform your goal achievement.'
              )}
              className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-3 font-medium"
            >
              <Phone className="w-5 h-5" />
              Schedule a Demo Call
            </button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4">
              <span className="text-gray-900">accountabit</span>
              <span className="text-blue-600">.ai</span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Intelligent accountability coaching that transforms goals into achievements. 
              Your AI partner for consistent progress and lasting success.
            </p>
            
            <div className="text-gray-500">
              © 2025 accountabit.ai. Empowering achievement through intelligent accountability.
            </div>
          </div>
        </div>
      </footer>

      {/* Email Signup Modal */}
      <EmailSignupModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        source={modalState.source}
        title={modalState.title}
        description={modalState.description}
      />

      {/* Admin Panel */}
      {showAdminPanel && <AdminPanel />}
    </div>
  );
}

export default App;