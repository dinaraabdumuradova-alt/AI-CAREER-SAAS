'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg" />
              <span className="font-bold text-lg hidden sm:inline">AI-Career SAAS</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold">
            Find Your Perfect <span className="gradient-text">Internship</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            AI-powered platform that analyzes your CV and matches you with the best internship opportunities
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-blue-500/30 border border-blue-400/50 hover:bg-blue-500/50 transition-all font-semibold">
              Get Started
            </button>
            <button className="px-8 py-4 rounded-xl bg-purple-500/30 border border-purple-400/50 hover:bg-purple-500/50 transition-all font-semibold">
              Learn More
            </button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
          {[
            { title: 'AI-Powered Matching', icon: '🤖' },
            { title: 'CV Analysis', icon: '📄' },
            { title: 'Job Recommendations', icon: '⚡' },
            { title: 'Application Tracking', icon: '📊' },
          ].map((feature, i) => (
            <div key={i} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
            </div>
          ))}
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4 mt-20">
          {[
            { label: 'Students', value: '10,000+' },
            { label: 'Internships', value: '50,000+' },
            { label: 'Success Rate', value: '95%' },
          ].map((stat, i) => (
            <div key={i} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-white/70 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-md bg-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-white/60 text-sm">
          <p>&copy; 2026 AI-Career SAAS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
