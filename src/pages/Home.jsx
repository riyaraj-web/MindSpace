import { Link } from 'react-router-dom';
import { Card } from '../design-system/components/Card/Card';
import { Button } from '../design-system/components/Button/Button';
import { 
  Heart, Brain, BookOpen, TrendingUp, Target, Wind, 
  Users, Sparkles, ArrowRight, CheckCircle2 
} from 'lucide-react';

function Home() {
  const features = [
    {
      icon: Heart,
      title: 'Mood Tracking',
      description: 'Monitor your emotional patterns and identify triggers with intelligent insights',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Brain,
      title: 'Guided Meditation',
      description: 'Find peace with our collection of mindfulness exercises and breathing techniques',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: BookOpen,
      title: 'Personal Journal',
      description: 'Express your thoughts and reflect on your experiences with AI-powered prompts',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Wellness Dashboard',
      description: 'Track your progress and see your wellness journey with advanced analytics',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Target,
      title: 'Habit Tracking',
      description: 'Build healthy habits with streak tracking and personalized recommendations',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: Wind,
      title: 'Breathing Exercises',
      description: 'Practice mindful breathing with guided visual exercises and techniques',
      gradient: 'from-sky-500 to-blue-500'
    },
    {
      icon: Users,
      title: 'Recovery Stories',
      description: 'Share and read inspiring stories of overcoming mental health challenges',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Sparkles,
      title: 'AI Assistant',
      description: 'Get personalized guidance, insights, and support from your intelligent companion',
      gradient: 'from-fuchsia-500 to-pink-500'
    }
  ];

  const benefits = [
    'Evidence-based mental wellness tools',
    'Privacy-first approach to your data',
    'Personalized insights and recommendations',
    'Track progress over time'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700 font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Your Mental Wellness Companion</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="block text-neutral-900 mb-2">Welcome to Your</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-primary-600 to-purple-600 bg-clip-text text-transparent">
                Mental Wellness Journey
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Take care of your mind with our comprehensive suite of mental health tools, 
              designed to support your emotional wellbeing every step of the way.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="group px-8 py-4 text-lg">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900">
              Everything You Need for
              <span className="block bg-gradient-to-r from-indigo-600 to-primary-600 bg-clip-text text-transparent">
                Mental Wellness
              </span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Comprehensive tools designed to support your emotional health and personal growth
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  variant="elevated"
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`
                      w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient}
                      flex items-center justify-center
                      group-hover:scale-110 transition-transform duration-300
                      shadow-lg
                    `}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center text-indigo-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card 
            variant="gradient" 
            className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-primary-600 to-purple-600 text-white"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative text-center space-y-8 py-16 md:py-20">
              <h2 className="text-4xl md:text-5xl font-extrabold">
                Ready to Start Your Wellness Journey?
              </h2>
              <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto">
                Join thousands of people taking control of their mental health and building healthier habits.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link to="/dashboard">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="px-8 py-4 text-lg bg-white text-indigo-600 hover:bg-neutral-50"
                  >
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              <span className="bg-gradient-to-r from-indigo-600 to-primary-600 bg-clip-text text-transparent">
                Mindspace
              </span>
            </div>
            <p className="text-neutral-600">
              Made with ❤️ for mental wellness
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-neutral-500">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
