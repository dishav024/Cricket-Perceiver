import React, { useState, useEffect } from 'react';
import { Menu, Search, Briefcase, ChevronRight, Zap, Brain, Target, Video, Users, Info, Mail, LayoutGrid, Clock, Trophy, Feather } from 'lucide-react';

// --- CONFIGURATION ---
const BRAND_NAME = "The Cricket Perceivers";
const TAGLINE = "Seeing what others only watch.";

const PAGES = [
  { id: 'home', name: 'Home', icon: LayoutGrid },
  { id: 'match-insights', name: 'Match Insights', icon: Trophy },
  { id: 'player-mind-lab', name: 'Player Mind Lab', icon: Brain },
  { id: 'captains-room', name: "Captain's Room", icon: Briefcase },
  { id: 'momentum-lab', name: 'Momentum Lab', icon: Zap },
  { id: 'tactical-library', name: 'Tactical Library', icon: Target },
  { id: 'video-hub', name: 'Video Hub', icon: Video },
  { id: 'community', name: 'Perceivers’ Corner', icon: Users },
  { id: 'about', name: 'Our Philosophy', icon: Info },
  { id: 'contact', name: 'Collaborate', icon: Mail },
];

const ACCENT_COLOR = 'text-amber-400';
const BG_COLOR = 'bg-slate-950';
const CARD_BG = 'bg-slate-900';
const TEXT_COLOR = 'text-gray-200';
const MUTED_TEXT = 'text-gray-400';

// --- REUSABLE COMPONENTS ---

// Navigation Button for Sidebar/Header
const NavButton = ({ name, id, currentPage, Icon, onClick }) => (
  <button
    className={`flex items-center w-full px-4 py-2 text-sm rounded-lg transition duration-200 hover:bg-slate-800 ${currentPage === id ? `${ACCENT_COLOR} font-semibold border-l-2 border-amber-400` : `${TEXT_COLOR} font-medium`}`}
    onClick={() => onClick(id)}
  >
    <Icon className="w-5 h-5 mr-3" />
    {name}
  </button>
);

// Primary Call to Action Button
const PrimaryCTA = ({ children, onClick, Icon = ChevronRight }) => (
  <button
    className={`flex items-center justify-center px-6 py-3 font-semibold text-lg tracking-wider transition duration-300 rounded-lg ${BG_COLOR} text-white border border-amber-400 shadow-lg shadow-amber-900/50 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/50`}
    onClick={onClick}
  >
    {children}
    <Icon className="w-5 h-5 ml-2" />
  </button>
);

// Secondary Button
const SecondaryCTA = ({ children, onClick, Icon }) => (
  <button
    className={`flex items-center px-4 py-2 font-medium text-sm transition duration-200 rounded-lg border border-slate-700 ${TEXT_COLOR} hover:border-amber-400 hover:${ACCENT_COLOR}`}
    onClick={onClick}
  >
    {Icon && <Icon className="w-4 h-4 mr-2" />}
    {children}
  </button>
);

// Content Tag
const Tag = ({ children, isAccent = false }) => (
  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full ${isAccent ? `${ACCENT_COLOR} border border-amber-500/50 bg-amber-900/20` : `${MUTED_TEXT} border border-slate-700 bg-slate-800`}`}>
    {children}
  </span>
);

// Standard Content Card
const ContentCard = ({ title, teaser, tags = [], onClick, type = 'Article' }) => (
  <div
    className={`p-6 rounded-xl transition duration-300 cursor-pointer ${CARD_BG} border border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-900/10`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex space-x-2">
        {tags.map((tag, i) => <Tag key={i} isAccent={tag === 'Momentum Shift'}>{tag}</Tag>)}
      </div>
      <Tag>{type}</Tag>
    </div>
    <h3 className={`text-xl font-bold mb-2 leading-snug ${TEXT_COLOR}`}>{title}</h3>
    <p className={`text-sm ${MUTED_TEXT} mb-4`}>{teaser}</p>
    <SecondaryCTA onClick={(e) => { e.stopPropagation(); onClick(); }}>
      Read Insight
    </SecondaryCTA>
  </div>
);

// --- LAYOUT COMPONENTS ---

const Header = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-lg bg-slate-950/90 border-b border-slate-800/80 shadow-lg shadow-slate-900/50`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo and Brand Name */}
        <div className="flex items-center">
          <button className={`text-2xl font-extrabold tracking-tight ${ACCENT_COLOR}`} onClick={() => onNavigate('home')}>
            {BRAND_NAME}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          {PAGES.filter(p => p.id !== 'home').map(page => (
            <button
              key={page.id}
              className={`text-sm font-medium transition duration-200 relative group ${currentPage === page.id ? ACCENT_COLOR : MUTED_TEXT + ' hover:text-white'}`}
              onClick={() => onNavigate(page.id)}
            >
              {page.name}
              <span className={`absolute bottom-[-4px] left-0 w-full h-0.5 transition-all duration-300 ${currentPage === page.id ? 'bg-amber-400' : 'bg-transparent group-hover:bg-amber-500/50'}`}></span>
            </button>
          ))}
        </nav>

        {/* CTAs and Search */}
        <div className="flex items-center space-x-4">
          <button className={`p-2 rounded-full ${MUTED_TEXT} hover:${ACCENT_COLOR} transition duration-200`}>
            <Search className="w-5 h-5" />
          </button>
          <div className="hidden sm:block">
            <PrimaryCTA onClick={() => onNavigate('community')} Icon={Users}>
              Join The Inner Circle
            </PrimaryCTA>
          </div>
          <button
            className={`lg:hidden p-2 rounded-lg transition duration-200 ${MUTED_TEXT} hover:${ACCENT_COLOR} ${isMenuOpen ? ACCENT_COLOR : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-slate-900 border-t border-slate-800 p-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {PAGES.map(page => (
              <NavButton
                key={page.id}
                name={page.name}
                id={page.id}
                currentPage={currentPage}
                Icon={page.icon}
                onClick={(id) => { onNavigate(id); setIsMenuOpen(false); }}
              />
            ))}
            <div className='pt-4'>
                <PrimaryCTA onClick={() => onNavigate('community')} Icon={Users}>
                  Join The Inner Circle
                </PrimaryCTA>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = ({ onNavigate }) => (
  <footer className={`border-t border-slate-800 ${BG_COLOR} mt-20 pt-12 pb-8`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

        {/* Brand Info */}
        <div className="col-span-2 md:col-span-2">
          <h4 className={`text-xl font-bold mb-3 ${ACCENT_COLOR}`}>{BRAND_NAME}</h4>
          <p className={`text-sm ${MUTED_TEXT} max-w-sm mb-4`}>
            We explain the WHY behind everything in a cricket match — decisions, collapses, comebacks, and momentum. Designed for those who feel the game.
          </p>
          <p className={`text-xs ${MUTED_TEXT}`}>&copy; {new Date().getFullYear()} The Cricket Perceivers.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <h5 className={`text-sm font-semibold mb-2 ${TEXT_COLOR}`}>Sections</h5>
          {PAGES.filter(p => p.id !== 'home' && p.id !== 'contact').map(page => (
            <button key={page.id} className={`text-sm text-left ${MUTED_TEXT} hover:${ACCENT_COLOR} transition-colors`} onClick={() => onNavigate(page.id)}>
              {page.name}
            </button>
          ))}
        </div>

        {/* Resources & Contact */}
        <div className="flex flex-col space-y-2">
          <h5 className={`text-sm font-semibold mb-2 ${TEXT_COLOR}`}>Connect</h5>
          <button className={`text-sm text-left ${MUTED_TEXT} hover:${ACCENT_COLOR} transition-colors`} onClick={() => onNavigate('contact')}>Work with us / Collaborations</button>
          <a href="https://twitter.com/placeholder" target="_blank" rel="noopener noreferrer" className={`text-sm ${MUTED_TEXT} hover:${ACCENT_COLOR} transition-colors`}>Twitter (X)</a>
          <a href="https://youtube.com/placeholder" target="_blank" rel="noopener noreferrer" className={`text-sm ${MUTED_TEXT} hover:${ACCENT_COLOR} transition-colors`}>YouTube</a>
          <a href="https://instagram.com/placeholder" target="_blank" rel="noopener noreferrer" className={`text-sm ${MUTED_TEXT} hover:${ACCENT_COLOR} transition-colors`}>Instagram</a>
        </div>
        
        {/* Future Vision */}
        <div className="flex flex-col space-y-2">
          <h5 className={`text-sm font-semibold mb-2 ${TEXT_COLOR}`}>App Vision</h5>
          <p className={`text-sm ${MUTED_TEXT}`}>
            Your personal cricket tactics companion. Coming soon to iOS/Android.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

// --- PAGE COMPONENTS ---

const HeroSection = ({ onNavigate }) => (
  <div className="py-20 md:py-32 text-center">
    <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tighter mb-4 ${TEXT_COLOR}`}>
      We don’t just watch cricket. <span className={ACCENT_COLOR}>We perceive it.</span>
    </h1>
    <p className={`text-lg sm:text-xl ${MUTED_TEXT} max-w-3xl mx-auto mb-10`}>
      Deep tactical, psychological, and momentum-based analysis explained in human language.
    </p>
    <div className="flex justify-center space-x-4">
      <PrimaryCTA onClick={() => onNavigate('match-insights')}>
        Explore Latest Match Insights
      </PrimaryCTA>
      <SecondaryCTA onClick={() => onNavigate('player-mind-lab')} Icon={Brain}>
        Discover Player Mind Lab
      </SecondaryCTA>
    </div>
  </div>
);

const MatchCardLarge = ({ onNavigate }) => (
  <div className={`p-8 rounded-2xl ${CARD_BG} border-2 border-amber-400/30 shadow-2xl shadow-amber-900/20`}>
    <p className={`text-xs font-semibold uppercase tracking-widest ${ACCENT_COLOR} mb-2`}>Featured Breakdown</p>
    <h2 className={`text-3xl font-bold mb-4 ${TEXT_COLOR}`}>
      The field trap that didn’t look like a trap: <br />
      How one over changed everything in the Final.
    </h2>
    <div className="flex flex-wrap gap-2 mb-6">
      <Tag isAccent>Momentum Shift</Tag>
      <Tag>Captaincy</Tag>
      <Tag>Psychology</Tag>
      <Tag>Pitch Behavior</Tag>
    </div>
    <p className={`text-base ${MUTED_TEXT} mb-8`}>
      In the 32nd over of the second innings, the field placement looked passive. But it was a calculated risk that forced the batter to play against their natural tempo, setting up a dismissal two overs later. We break down the invisible strategy.
    </p>
    <div className="flex space-x-4">
      <PrimaryCTA onClick={() => onNavigate('match-insights')} Icon={Clock}>
        Read Full Breakdown (12 min)
      </PrimaryCTA>
      <SecondaryCTA onClick={() => onNavigate('video-hub')} Icon={Video}>
        Watch Video Breakdown
      </SecondaryCTA>
    </div>
  </div>
);

const PlayerSnapshotCard = ({ name, role, snapshot }) => (
  <div className={`p-6 rounded-xl ${CARD_BG} w-64 flex-shrink-0 border border-slate-800 transition duration-300 hover:border-amber-400/50`}>
    <h4 className={`text-xl font-bold ${ACCENT_COLOR}`}>{name}</h4>
    <p className={`text-xs uppercase font-medium ${MUTED_TEXT} mb-3`}>{role}</p>
    <p className={`text-sm ${TEXT_COLOR} italic mb-4`}>"{snapshot}"</p>
    <SecondaryCTA onClick={() => {}} Icon={Brain}>
      Open Profile
    </SecondaryCTA>
  </div>
);

// --- HOME PAGE (4.1) ---

const HomePage = ({ onNavigate }) => {
  const latestInsights = [
    { title: "The over where India actually lost it", teaser: "It wasn't the collapse, it was the over immediately preceding it. The fatigue was visible.", tags: ["Momentum Shift", "Psychology"], type: "Article" },
    { title: "Why the slower ball keeps beating Surya", teaser: "We break down his pre-shot routine and why the deception window is too large against certain release points.", tags: ["Player", "Tactics"], type: "Video" },
    { title: "The field trap that didn’t look like a trap", teaser: "A deep dive into the Captain's Room: the geometry of the off-side field and the planned single.", tags: ["Captaincy", "Tactics"], type: "Article" },
    { title: "Reverse Pressure: How a non-striker can impact the bowler", teaser: "The hidden communication and tempo control used by elite non-strikers.", tags: ["Psychology"], type: "Thread" },
  ];

  const playerSnapshots = [
    { name: "S. Khan", role: "Finisher / Middle Order", snapshot: "Instinct-driven, hates losing tempo. Uses anticipation over pure reaction." },
    { name: "A. Patel", role: "Off-Spinner / All Rounder", snapshot: "Treats every ball like a mini-battle. Highly sensitive to pitch wear." },
    { name: "J. Sharma", role: "Fast Bowler / Spearhead", snapshot: "A clear pattern of setting up the batter with the third ball. Prefers control to raw pace." },
    { name: "L. Kallis", role: "Opening Batter", snapshot: "Hyper-aware of the clock and required run rate. Never trusts a good start." },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection onNavigate={onNavigate} />

        <section className="mt-16 mb-20">
          <MatchCardLarge onNavigate={onNavigate} />
        </section>

        {/* Latest Insights Grid (4.1, Section 3) */}
        <section className="mb-20">
          <h2 className={`text-3xl font-bold mb-8 ${TEXT_COLOR} border-b border-slate-800 pb-4`}>Latest Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestInsights.map((insight, i) => (
              <ContentCard key={i} {...insight} onClick={() => onNavigate('match-insights')} />
            ))}
          </div>
        </section>

        {/* Player Mind Lab Preview (4.1, Section 4) */}
        <section className="mb-20">
          <h2 className={`text-3xl font-bold mb-4 ${TEXT_COLOR}`}>Player Mind Lab</h2>
          <p className={`${MUTED_TEXT} mb-8`}>
            Deconstructing the psychological blueprints of the world's best. Their thought processes, risk patterns, and confidence triggers.
          </p>
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {playerSnapshots.map((player, i) => (
              <PlayerSnapshotCard key={i} {...player} />
            ))}
            <div className="p-6 rounded-xl ${CARD_BG} w-64 flex-shrink-0 border-dashed border border-slate-700 flex items-center justify-center">
              <SecondaryCTA onClick={() => onNavigate('player-mind-lab')}>
                View All {'>'}
              </SecondaryCTA>
            </div>
          </div>
        </section>
        
        {/* Momentum Lab Preview (4.1, Section 5) */}
        <section className="mb-20 p-8 rounded-xl bg-slate-900 border border-slate-800">
            <h2 className={`text-3xl font-bold mb-4 ${TEXT_COLOR}`}>Momentum Lab</h2>
            <p className={`${MUTED_TEXT} mb-8`}>
                Momentum is not just scoring runs. It's the psychological energy shift. We track it with granular precision.
            </p>
            {/* Simple Visual Placeholder */}
            <div className="h-40 bg-slate-800 rounded-lg relative mb-8 flex items-center justify-between p-4">
                <div className={`text-xs ${ACCENT_COLOR}`}>Over 1</div>
                <div className="flex-1 h-1 bg-slate-700 mx-4 relative">
                    <div className="absolute top-1/2 -mt-2 -ml-2 w-4 h-4 bg-red-600 rounded-full border-2 border-slate-900 cursor-pointer" title="Momentum Spike: Collapse Trigger (Wicket)"></div>
                    <div className="absolute left-[30%] top-1/2 -mt-2 -ml-2 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 cursor-pointer" title="Momentum Spike: Control Established (Boundary Burst)"></div>
                    <div className="absolute left-[70%] top-1/2 -mt-2 -ml-2 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-900 cursor-pointer" title="Momentum Spike: The Strategic Maiden"></div>
                </div>
                <div className={`text-xs ${ACCENT_COLOR}`}>Over 50</div>
            </div>
            <p className={`text-sm ${MUTED_TEXT} italic`}>Click on a spike in the full Lab to read the precise narrative: "This over didn't look big, but it broke the bowling rhythm."</p>
            <div className="mt-6">
                <SecondaryCTA onClick={() => onNavigate('momentum-lab')} Icon={Zap}>
                    See Full Momentum Breakdown
                </SecondaryCTA>
            </div>
        </section>

        {/* Why The Cricket Perceivers? (4.1, Section 6) */}
        <section className="mb-20">
          <h2 className={`text-3xl font-bold mb-8 ${TEXT_COLOR} text-center`}>Our Core Philosophy</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <PillarCard title="Tactical Depth" description="Complex strategies explained simply. No dumbing down, just clarity." />
            <PillarCard title="Respect & Ruthlessness" description="Respect for players, ruthless critique of decisions. We separate the person from the choice." />
            <PillarCard title="Insider Understanding" description="Designed for fans who feel the game. We give language to your intuition." />
            <PillarCard title="Ground-Level Experience" description="Analysis informed by actual coaching and player perspectives, not just armchairs." />
          </div>
        </section>

        {/* Video Hub Strip (4.1, Section 7) */}
        <section className="mb-20">
            <h2 className={`text-3xl font-bold mb-4 ${TEXT_COLOR}`}>Video Hub: Tactical Studio</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <VideoThumbnail title="The unseen wrist flick that generates spin" duration="8:30" />
                <VideoThumbnail title="Captaincy 101: Field geometry vs. batter psychology" duration="15:12" />
                <VideoThumbnail title="The 'Energy Over' and how to spot it" duration="6:45" />
            </div>
            <div className="mt-6 text-center">
                <SecondaryCTA onClick={() => onNavigate('video-hub')} Icon={Video}>
                    View All Videos
                </SecondaryCTA>
            </div>
        </section>

        {/* Join the Inner Circle (4.1, Section 8) */}
        <section className="mb-20 p-10 md:p-16 rounded-xl bg-slate-900 border border-slate-700 text-center">
          <h2 className={`text-3xl font-bold mb-3 ${ACCENT_COLOR}`}>Join The Inner Circle</h2>
          <p className={`${TEXT_COLOR} text-lg max-w-2xl mx-auto mb-8`}>
            Access our unpublished thoughts, deeper tactical threads, and submit match moments you want explained by the Perceivers team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email address..."
              className={`p-3 rounded-lg w-full sm:w-80 bg-slate-950 border border-slate-700 ${TEXT_COLOR} focus:border-amber-400 focus:ring-1 focus:ring-amber-400`}
            />
            <PrimaryCTA onClick={() => {}}>
              Join The Perceivers’ List
            </PrimaryCTA>
          </div>
        </section>

      </div>
    </div>
  );
};

// Supporting component for Home Page
const PillarCard = ({ title, description }) => (
  <div className={`p-6 rounded-xl ${CARD_BG} border border-slate-800`}>
    <Target className={`w-8 h-8 mb-3 ${ACCENT_COLOR}`} />
    <h3 className={`text-xl font-semibold mb-2 ${TEXT_COLOR}`}>{title}</h3>
    <p className={`text-sm ${MUTED_TEXT}`}>{description}</p>
  </div>
);

const VideoThumbnail = ({ title, duration }) => (
    <div className={`rounded-xl overflow-hidden ${CARD_BG} cursor-pointer group`}>
        <div className="h-40 bg-slate-800 flex items-center justify-center relative">
            <Video className={`w-12 h-12 ${ACCENT_COLOR} transition-transform group-hover:scale-110`} />
            <span className="absolute bottom-2 right-2 px-2 py-0.5 text-xs bg-black/70 rounded-md text-white">{duration}</span>
        </div>
        <div className="p-4">
            <h4 className={`text-base font-semibold ${TEXT_COLOR} group-hover:${ACCENT_COLOR}`}>{title}</h4>
            <p className={`text-xs ${MUTED_TEXT} mt-1`}>Tap to watch the full breakdown.</p>
        </div>
    </div>
);


// --- MATCH INSIGHTS PAGE (4.2) ---

const MatchInsightsPage = ({ onNavigate }) => {
  const [filters, setFilters] = useState({ format: 'All', team: 'All', theme: [] });

  const insightsList = [
    { id: 1, title: "The hidden reasons behind India’s chase collapse", format: "ODI", team: "India", tags: ["Collapse", "Psychology"], readTime: "10 min" },
    { id: 2, title: "How one spell built an invisible wall", format: "Test", team: "Aus", tags: ["Momentum Shift", "Pitch"], readTime: "14 min" },
    { id: 3, title: "Captaincy Masterclass: The first 10 overs of the 4th Innings", format: "Test", team: "Eng", tags: ["Captaincy", "Tactics"], readTime: "8 min" },
    { id: 4, title: "Why this chase looked under control — but wasn’t", format: "T20", team: "WI", tags: ["Momentum Shift"], readTime: "7 min" },
  ];

  const themeTags = ["Momentum Shift", "Psychology", "Captaincy", "Collapse", "Comeback", "Pitch", "Tactics"];

  const handleTagToggle = (tag) => {
    setFilters(prev => ({
      ...prev,
      theme: prev.theme.includes(tag)
        ? prev.theme.filter(t => t !== tag)
        : [...prev.theme, tag]
    }));
  };

  const filteredInsights = insightsList.filter(item => 
    (filters.format === 'All' || item.format === filters.format) &&
    (filters.team === 'All' || item.team === filters.team) &&
    (filters.theme.length === 0 || filters.theme.some(tag => item.tags.includes(tag)))
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className={`text-4xl font-extrabold mb-3 ${ACCENT_COLOR}`}>Match Insights</h1>
      <p className={`text-lg ${MUTED_TEXT} mb-10 max-w-3xl`}>
        The central hub for all match-based analysis. Filter by format, team, or the critical theme that defined the outcome.
      </p>

      {/* Filters Section */}
      <div className={`${CARD_BG} p-6 rounded-xl mb-10 border border-slate-800`}>
        <h3 className={`text-xl font-semibold mb-4 ${TEXT_COLOR}`}>Filter Analysis</h3>
        
        {/* Format and Team Selectors */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${MUTED_TEXT}`}>Format</label>
            <select className={`w-full p-2 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`} onChange={(e) => setFilters(prev => ({ ...prev, format: e.target.value }))}>
              <option>All</option>
              <option>Test</option>
              <option>ODI</option>
              <option>T20</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${MUTED_TEXT}`}>Team</label>
            <select className={`w-full p-2 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`} onChange={(e) => setFilters(prev => ({ ...prev, team: e.target.value }))}>
              <option>All</option>
              <option>India</option>
              <option>Aus</option>
              <option>Eng</option>
              <option>WI</option>
            </select>
          </div>
        </div>

        {/* Theme Tags */}
        <div className="mt-6">
          <label className={`block text-sm font-medium mb-2 ${MUTED_TEXT}`}>Focus Themes</label>
          <div className="flex flex-wrap gap-2">
            {themeTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition duration-150 border ${
                  filters.theme.includes(tag)
                    ? 'bg-amber-400 text-slate-950 border-amber-400'
                    : 'bg-slate-800 text-gray-300 border-slate-700 hover:border-amber-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-6">
        {filteredInsights.length > 0 ? filteredInsights.map(insight => (
          <div 
            key={insight.id}
            className={`p-6 rounded-xl ${CARD_BG} border border-slate-800 hover:border-amber-500/50 cursor-pointer transition duration-300`}
            onClick={() => alert(`Navigating to detailed analysis for: ${insight.title}`)}
          >
            <div className="flex items-center space-x-3 mb-3">
                <Tag>{insight.format}</Tag>
                <Tag isAccent>{insight.team}</Tag>
                {insight.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${TEXT_COLOR}`}>{insight.title}</h2>
            <div className="flex items-center space-x-4">
                <p className={`text-sm ${MUTED_TEXT} flex items-center`}><Clock className="w-4 h-4 mr-1"/> {insight.readTime}</p>
                <SecondaryCTA onClick={(e) => { e.stopPropagation(); alert(`Navigating to detailed analysis for: ${insight.title}`); }}>
                    Open Analysis
                </SecondaryCTA>
            </div>
          </div>
        )) : <p className={MUTED_TEXT}>No insights match your current filters. Try relaxing a theme tag.</p>}
      </div>
    </div>
  );
};


// --- PLAYER MIND LAB PAGE (4.3) ---

const PlayerMindLabPage = ({ onNavigate }) => {
    const players = [
        { name: "Virat Kohli", team: "India", role: "Top-Order Batter", perception: "The chase master. Treats required run rate as a personal challenge. Rarely panics, often accelerates subtly." },
        { name: "Kagiso Rabada", team: "SA", role: "Fast Bowler", perception: "Relies on rhythm and aggression. Can be exposed if forced to defend or change pace too often. Elite setup bowler." },
        { name: "Ben Stokes", team: "Eng", role: "All Rounder/Captain", perception: "Driven by narrative. Performs best when cornered. Emotional leader, but tactical risks are often measured." },
        { name: "Rishabh Pant", team: "India", role: "Wicketkeeper/Batter", perception: "High-risk instinct player, thrives on chaos. Hates drag in tempo. The most unpredictable risk pattern in the game." },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className={`text-4xl font-extrabold mb-3 ${ACCENT_COLOR}`}>Player Mind Lab</h1>
            <p className={`text-lg ${MUTED_TEXT} mb-10 max-w-3xl`}>
                A deep-dive library of players’ mental and tactical profiles. See the game from their perspective.
            </p>

            {/* Search and Filters */}
            <div className={`p-6 rounded-xl ${CARD_BG} border border-slate-800 mb-10`}>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search by Player Name..."
                            className={`w-full p-3 pl-10 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR} focus:border-amber-400 focus:ring-1 focus:ring-amber-400`}
                        />
                        <Search className={`w-5 h-5 absolute left-3 top-3 ${MUTED_TEXT}`} />
                    </div>
                    <select className={`p-3 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`}>
                        <option>Filter by Role</option>
                        <option>Opener</option>
                        <option>Finisher</option>
                        <option>Death Bowler</option>
                    </select>
                </div>
            </div>

            {/* Player Cards */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {players.map((player, i) => (
                    <div 
                        key={i}
                        className={`p-6 rounded-xl ${CARD_BG} border border-slate-800 hover:border-amber-400/50 transition duration-300 cursor-pointer`}
                        onClick={() => alert(`Navigating to full profile for ${player.name}`)}
                    >
                        <Brain className={`w-6 h-6 mb-3 ${ACCENT_COLOR}`} />
                        <h3 className={`text-2xl font-bold mb-1 ${TEXT_COLOR}`}>{player.name}</h3>
                        <p className={`text-sm uppercase font-medium ${MUTED_TEXT} mb-3`}>{player.role} • {player.team}</p>
                        <p className={`text-base ${TEXT_COLOR} mb-4`}>
                            <span className={`${ACCENT_COLOR} mr-1`}>&gt;</span> {player.perception}
                        </p>
                        <SecondaryCTA onClick={(e) => { e.stopPropagation(); alert(`Navigating to full profile for ${player.name}`); }}>
                            Open Mind Profile
                        </SecondaryCTA>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- GENERIC CONTENT PAGE TEMPLATE ---

const SimpleContentPage = ({ pageId, title, subTitle, children }) => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className={`text-4xl font-extrabold mb-3 ${ACCENT_COLOR}`}>{title}</h1>
        <p className={`text-lg ${MUTED_TEXT} mb-10 max-w-3xl`}>{subTitle}</p>
        <div className={`p-6 md:p-10 rounded-xl ${CARD_BG} border border-slate-800`}>
            {children}
        </div>
    </div>
);

// --- CAPTAIN'S ROOM PAGE (4.4) ---

const CaptainsRoomPage = () => (
    <SimpleContentPage 
        pageId="captains-room"
        title="Captain’s Room"
        subTitle="Pure focus on leadership logic, field geometry, bowling rotations, and in-game strategic shifts."
    >
        <div className="space-y-8">
            <h2 className={`text-2xl font-bold ${TEXT_COLOR} border-b border-slate-700 pb-3 mb-4`}>Latest Masterclass Analyses</h2>
            {[
                { title: "The Art of the Strategic Maiden: Field Placement vs. Run Rate Pressure", tags: ["Fielding", "T20"], time: "11 min" },
                { title: "Review Decisions: When the Captain Trusts the Bowler vs. The Keeper", tags: ["Decision Making", "Psychology"], time: "9 min" },
                { title: "Bowling Changes: The 5-Over Rule and Why Captains Break It", tags: ["Bowling", "ODI"], time: "15 min" },
            ].map((article, i) => (
                <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 last:border-b-0">
                    <div>
                        <h3 className={`text-xl font-semibold mb-1 ${TEXT_COLOR} hover:${ACCENT_COLOR} cursor-pointer`}>{article.title}</h3>
                        <div className="flex space-x-2">
                            {article.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
                        </div>
                    </div>
                    <SecondaryCTA onClick={() => {}} Icon={Clock}>
                        Read Masterclass ({article.time})
                    </SecondaryCTA>
                </div>
            ))}
        </div>
    </SimpleContentPage>
);


// --- MOMENTUM LAB PAGE (4.5) ---

const MomentumLabPage = () => {
    const events = [
        { time: 'Over 6.2', narrative: 'Boundary Burst: Three fours in four balls. This shifted the pressure back entirely onto the new bowler and elevated the batter’s confidence index by +15 points.', momentum: 'up' },
        { time: 'Over 14.6', narrative: 'Clutch Wicket: A strategic maiden followed by a tight dot-ball setup and a soft dismissal. The psychological energy of the fielding side spiked, breaking the scoring rhythm.', momentum: 'down' },
        { time: 'Over 25.1', narrative: 'Strategic Maiden: A defensive field placement used not to save runs, but to force the set batter to watch the ball for 6 deliveries, introducing doubt.', momentum: 'flat' },
        { time: 'Over 35.5', narrative: 'Body Language Shift: Batter A took a long time to mark guard after a dropped catch. The fielders noticed and their energy lifted, anticipating the next mistake.', momentum: 'up' },
    ];

    return (
        <SimpleContentPage
            pageId="momentum-lab"
            title="Momentum Lab"
            subTitle="Visualizing and quantifying the abstract energy shifts in a cricket match. This is where you feel the game."
        >
            <h2 className={`text-2xl font-bold ${TEXT_COLOR} mb-6`}>The Anatomy of a Momentum Shift (Example Match)</h2>
            <div className="relative border-l border-slate-700 pl-6 space-y-8">
                {events.map((event, i) => (
                    <div key={i} className="relative">
                        {/* Event Marker */}
                        <div className={`absolute left-[-37px] top-0 w-4 h-4 rounded-full border-2 ${event.momentum === 'up' ? 'bg-green-500 border-green-800' : event.momentum === 'down' ? 'bg-red-600 border-red-900' : 'bg-amber-400 border-amber-700'}`}></div>
                        
                        <p className={`text-sm font-mono ${ACCENT_COLOR} mb-1`}>{event.time}</p>
                        <h3 className={`text-xl font-semibold ${TEXT_COLOR} mb-2`}>{event.narrative.split(':')[0]}</h3>
                        <p className={`text-base ${MUTED_TEXT}`}>{event.narrative.split(': ')[1]}</p>
                    </div>
                ))}
            </div>
            <p className={`text-sm ${MUTED_TEXT} mt-8`}>
                <span className={ACCENT_COLOR}>UP/DOWN Markers:</span> Up (Green) indicates a significant energy injection for the batting side. Down (Red) indicates a major psychological swing towards the fielding team.
            </p>
        </SimpleContentPage>
    );
};

// --- TACTICAL LIBRARY PAGE (4.6) ---

const TacticalLibraryPage = () => {
    const concepts = [
        { title: "The Setup Over", definition: "A bowler sacrifices 4-6 runs to ensure the perfect dismissal ball is bowled in the next over.", tags: ["Evergreen", "Bowler"] },
        { title: "Reverse Pressure", definition: "The psychological technique of a non-striker to interrupt the bowler's rhythm or focus by controlling the tempo between balls.", tags: ["Psychology", "Batting"] },
        { title: "Angle Manipulation", definition: "Using the crease (wide/close) and wrist position to make the batter play for a line that isn't delivered.", tags: ["Bowler", "Tactics"] },
        { title: "Double Bluff Field", definition: "Setting a highly aggressive field to bluff the batter into believing the ball will be short, only to bowl a full delivery.", tags: ["Captaincy", "Fielding"] },
    ];

    return (
        <SimpleContentPage
            pageId="tactical-library"
            title="Tactical Library"
            subTitle="An evergreen, searchable glossary of advanced cricket concepts, strategies, and psychological mechanisms."
        >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {concepts.map((concept, i) => (
                    <div 
                        key={i}
                        className={`p-6 rounded-xl ${CARD_BG} border border-slate-800 hover:border-amber-400/50 transition duration-300 cursor-pointer`}
                        onClick={() => alert(`Navigating to definition of: ${concept.title}`)}
                    >
                        <Target className={`w-5 h-5 mb-3 ${ACCENT_COLOR}`} />
                        <h3 className={`text-xl font-semibold mb-2 ${TEXT_COLOR}`}>{concept.title}</h3>
                        <p className={`text-sm ${MUTED_TEXT} mb-3`}>{concept.definition}</p>
                        <div className="flex space-x-2">
                            {concept.tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
                        </div>
                    </div>
                ))}
            </div>
        </SimpleContentPage>
    );
};

// --- VIDEO HUB PAGE (4.7) ---

const VideoHubPage = () => {
    const videos = [
        { title: "Full Match Breakdown: The 2019 Final — The Psychological Toll of a Tie", category: "Full Match Breakdowns", duration: "45:30" },
        { title: "Player Mind Episode: Rohit Sharma's Initial 10 Balls Strategy", category: "Player Mind Episodes", duration: "12:05" },
        { title: "Captaincy Session: Setting the Field for a Reverse-Swing Master", category: "Captaincy Sessions", duration: "20:18" },
        { title: "Momentum Story: How a single six broke the bowlers' resolve", category: "Momentum Stories", duration: "7:40" },
    ];

    return (
        <SimpleContentPage
            pageId="video-hub"
            title="Video Hub"
            subTitle="Long-form visual analysis and breakdown from the tactical studio. Watch the game through the Perceivers' lens."
        >
            <div className="space-y-8">
                <h2 className={`text-2xl font-bold ${TEXT_COLOR}`}>Full Match Breakdowns</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.filter(v => v.category === "Full Match Breakdowns").map((v, i) => (
                        <VideoThumbnail key={i} title={v.title} duration={v.duration} />
                    ))}
                </div>

                <h2 className={`text-2xl font-bold ${TEXT_COLOR} pt-4 border-t border-slate-700`}>Player Mind Episodes & Captaincy Sessions</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.filter(v => v.category.includes("Player Mind") || v.category.includes("Captaincy")).map((v, i) => (
                        <VideoThumbnail key={i} title={v.title} duration={v.duration} />
                    ))}
                </div>
            </div>
        </SimpleContentPage>
    );
};

// --- COMMUNITY / PERCEIVERS’ CORNER (4.8) ---

const CommunityPage = () => (
    <SimpleContentPage
        pageId="community"
        title="Perceivers’ Corner"
        subTitle="The inner circle for deep conversation. Submit moments for analysis and ask your most pressing tactical questions."
    >
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <h2 className={`text-2xl font-bold ${TEXT_COLOR} mb-4`}>Submit a Moment for Analysis</h2>
                <p className={`${MUTED_TEXT} mb-6`}>
                    Did you see a wicket or a spell that confused or fascinated you? Paste a link to the clip or provide the match details, and the Perceivers will consider it for a full breakdown.
                </p>
                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className={`w-full p-3 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`} />
                    <input type="email" placeholder="Your Email" className={`w-full p-3 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`} />
                    <textarea placeholder="Match Details / Link to Clip / Question..." rows="5" className={`w-full p-3 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`} />
                    <PrimaryCTA onClick={() => alert("Moment Submitted!")}>
                        Send to The Perceivers
                    </PrimaryCTA>
                </form>
            </div>
            <div className="md:col-span-1 border-l border-slate-700 pl-6">
                <h2 className={`text-2xl font-bold ${TEXT_COLOR} mb-4`}>Inner Threads</h2>
                <div className="space-y-4">
                    <div className={`${CARD_BG} p-4 rounded-lg`}>
                        <p className={`text-sm ${TEXT_COLOR}`}>Thread: Why is the off-stump guard becoming obsolete?</p>
                        <p className={`text-xs ${MUTED_TEXT}`}>45 replies • Last update 2h ago</p>
                    </div>
                    <div className={`${CARD_BG} p-4 rounded-lg`}>
                        <p className={`text-sm ${TEXT_COLOR}`}>Question: Analyzing the short ball setup to a tail-ender.</p>
                        <p className={`text-xs ${MUTED_TEXT}`}>12 replies • Last update 1 day ago</p>
                    </div>
                </div>
            </div>
        </div>
    </SimpleContentPage>
);

// --- ABOUT / PHILOSOPHY PAGE (4.9) ---

const AboutPage = () => (
    <SimpleContentPage
        pageId="about"
        title="Our Philosophy"
        subTitle="We exist to elevate the conversation around cricket. This is how we approach the game."
    >
        <h2 className={`text-2xl font-bold ${ACCENT_COLOR} mb-4`}>The Origin Story</h2>
        <p className={`${TEXT_COLOR} mb-8`}>
            The Cricket Perceivers was founded out of frustration. Frustration that the deep, nuanced, psychological chess match happening on the field was being ignored for simple scorecards and surface-level narratives. We are a collective of former players, coaches, and obsessive analysts who believe the 'why' is always more interesting than the 'what'.
        </p>

        <h2 className={`text-2xl font-bold ${ACCENT_COLOR} mb-4 border-t border-slate-700 pt-6`}>Our Pillars of Analysis</h2>
        <div className="space-y-6">
            {/* Switched to Feather for "Respect Players, Question Decisions" for a soft/gentle touch */}
            <PhilosophyPillar icon={Feather} title="Respect Players, Question Decisions" body="Our core rule. We will be blunt about a tactical error, but never about a person’s intent, character, or skill. We separate the game from the player." />
            <PhilosophyPillar icon={Brain} title="The Human Factor is the Strategy" body="We focus on player psychology, captaincy pressure, and momentum shifts. The game is played by people, and understanding their state of mind is the ultimate tactic." />
            <PhilosophyPillar icon={Target} title="Observational Depth" body="We spend hours dissecting five overs to find the single delivery or field change that defined the entire session. We find the hidden traps and setups." />
        </div>
    </SimpleContentPage>
);

const PhilosophyPillar = ({ icon: Icon, title, body }) => (
    <div className="flex space-x-4">
        <Icon className={`w-8 h-8 flex-shrink-0 ${ACCENT_COLOR}`} />
        <div>
            <h3 className={`text-xl font-semibold ${TEXT_COLOR} mb-1`}>{title}</h3>
            <p className={`${MUTED_TEXT}`}>{body}</p>
        </div>
    </div>
);

// --- CONTACT / COLLABORATE (4.10) ---

const ContactPage = () => (
    <SimpleContentPage
        pageId="contact"
        title="Collaborate with Us"
        subTitle="The Perceivers are always looking for partnerships that share our vision for elite, deep-dive analysis."
    >
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h2 className={`text-2xl font-bold ${TEXT_COLOR} mb-4`}>Collaboration Inquiry</h2>
                <p className={`${MUTED_TEXT} mb-6`}>
                    If you are a media outlet, a coaching team, a content creator, or a sponsor seeking high-quality, tactical cricket insight, please reach out.
                </p>
                <form className="space-y-4">
                    <input type="text" placeholder="Your Organization Name" className={`w-full p-3 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`} />
                    <input type="email" placeholder="Business Email" className={`w-full p-3 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`} />
                    <select className={`w-full p-3 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`}>
                        <option>General Inquiry</option>
                        <option>Media Partnership</option>
                        <option>Sponsorship/Advertising</option>
                        <option>Content Collaboration</option>
                    </select>
                    <textarea placeholder="Tell us about your project..." rows="5" className={`w-full p-3 rounded-lg bg-slate-950 border border-slate-700 ${TEXT_COLOR}`} />
                    <PrimaryCTA onClick={() => alert("Inquiry Sent!")}>
                        Submit Inquiry
                    </PrimaryCTA>
                </form>
            </div>
            <div className={`p-6 rounded-xl border border-slate-700 ${CARD_BG}`}>
                <h2 className={`text-xl font-bold ${ACCENT_COLOR} mb-3`}>Direct Contact</h2>
                <p className={`${MUTED_TEXT} mb-4`}>
                    For quick professional outreach:
                </p>
                <p className={`${TEXT_COLOR} font-semibold`}>Email:</p>
                <p className={`${MUTED_TEXT} mb-4`}>collaborate@cricketperceivers.com</p>
                
                <h2 className={`text-xl font-bold ${ACCENT_COLOR} mb-3 border-t border-slate-700 pt-4 mt-4`}>Join the Team</h2>
                <p className={`${MUTED_TEXT}`}>
                    Interested in becoming a Perceivers analyst or writer? Send your CV and a 500-word tactical breakdown of a recent match to our careers team.
                </p>
                <SecondaryCTA onClick={() => {}} Icon={Briefcase} className="mt-4">
                    View Open Roles
                </SecondaryCTA>
            </div>
        </div>
    </SimpleContentPage>
);


// --- MAIN APP COMPONENT ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'match-insights':
        return <MatchInsightsPage onNavigate={setCurrentPage} />;
      case 'player-mind-lab':
        return <PlayerMindLabPage onNavigate={setCurrentPage} />;
      case 'captains-room':
        return <CaptainsRoomPage onNavigate={setCurrentPage} />;
      case 'momentum-lab':
        return <MomentumLabPage onNavigate={setCurrentPage} />;
      case 'tactical-library':
        return <TacticalLibraryPage onNavigate={setCurrentPage} />;
      case 'video-hub':
        return <VideoHubPage onNavigate={setCurrentPage} />;
      case 'community':
        return <CommunityPage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'home':
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  const currentNavItems = PAGES.slice(0, 4); // For mobile bottom bar

  return (
    <div className={`min-h-screen ${BG_COLOR} antialiased font-sans`}>
      {/* Fix: Removed the external <style jsx global> block and its contents. 
        The warning "Received `true` for a non-boolean attribute `style`" often occurs 
        when the styling syntax is incorrect for the environment. Since this 
        app uses Tailwind CSS, we rely on utility classes for all styling 
        and should avoid proprietary styling features like 'style jsx'.
      */}
      
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="pb-24 lg:pb-0">
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />

      {/* Mobile Bottom Navigation Bar (Future App Vision Alignment) */}
      <nav className={`fixed bottom-0 left-0 w-full lg:hidden z-50 backdrop-blur-lg ${CARD_BG} border-t border-slate-700 shadow-2xl`}>
        <div className="flex justify-around items-center h-16">
          {currentNavItems.map(page => (
            <button
              key={page.id}
              className={`flex flex-col items-center text-xs pt-1 transition duration-200 ${currentPage === page.id ? ACCENT_COLOR : MUTED_TEXT + ' hover:text-white'}`}
              onClick={() => setCurrentPage(page.id)}
            >
              <page.icon className="w-5 h-5 mb-0.5" />
              {page.name}
            </button>
          ))}
          <button
              className={`flex flex-col items-center text-xs pt-1 transition duration-200 ${currentPage === 'video-hub' ? ACCENT_COLOR : MUTED_TEXT + ' hover:text-white'}`}
              onClick={() => setCurrentPage('video-hub')}
          >
              <Video className="w-5 h-5 mb-0.5" />
              Videos
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;