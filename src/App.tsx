import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowDown, AlertTriangle, CheckCircle, BarChart2, Target, Package, GitBranch, Heart, Monitor } from 'lucide-react';
import SignupStrategy from './SignupStrategy';

const COLORS = {
  primary: '#10b981', // XO green
  text: '#1f2937',
  textLight: '#6b7280',
  border: '#e5e7eb',
};

type Screen = 'landing' | 'tasks' | 'journeys' | 'flowchart' | 'signup';
type Journey = 'template' | 'github' | 'lovable' | 'local';

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  painPoints: string[];
  solutions: string[];
}

// GitHub Repository Journey Steps
const githubJourneySteps: JourneyStep[] = [
  {
    id: 1,
    title: 'Signup',
    description: 'User discovers XO Launchpad and creates an account',
    painPoints: [],
    solutions: [],
  },
  {
    id: 2,
    title: 'Products → Launchpad',
    description: 'Navigate to Launchpad',
    painPoints: [],
    solutions: [],
  },
  {
    id: 3,
    title: 'Create from Scratch',
    description: 'Click "Create from Scratch" button',
    painPoints: [],
    solutions: [],
  },
  {
    id: 4,
    title: 'Select GitHub Repository',
    description: 'Select deployment type as "GitHub Repository"',
    painPoints: ['No information on whether Dockerfile is required in the repository', 'No guidance on how to configure environment variables in Actions tab'],
    solutions: ['Display clear Dockerfile requirements before deployment', 'Provide step-by-step guide for configuring environment variables in Actions tab'],
  },
  {
    id: 5,
    title: 'Enter Repository Details',
    description: 'Fill in repo URL, branch name',
    painPoints: ['No validation before submission', 'Branch name not auto-detected'],
    solutions: ['Add real-time validation', 'Auto-detect default branch', 'Show repository preview'],
  },
  {
    id: 6,
    title: 'GitHub Access Token',
    description: 'Generate and enter GitHub Personal Access Token (PAT)',
    painPoints: ['Context switch to GitHub', 'Token not validated upfront'],
    solutions: ['OAuth integration instead of PAT', 'Validate token before proceeding'],
  },
  {
    id: 7,
    title: 'Enter Project Details',
    description: 'Enter project name and application port',
    painPoints: ['Port configuration unclear for non-technical users'],
    solutions: ['Auto-detect port from Dockerfile with option to override, include helpful tooltip explaining port purpose'],
  },
  {
    id: 8,
    title: 'Create Deployment',
    description: 'Click "Create Deployment" button',
    painPoints: ['Docker commands shown without context'],
    solutions: ['Explain when/why Docker commands are needed', 'Hide commands in collapsible section with clear label'],
  },
  {
    id: 9,
    title: 'Wait for Deployment',
    description: 'Wait for deployment to build and start (5+ minutes)',
    painPoints: ['No progress indicator', 'No time estimate', 'URL returns 502 error if accessed too early', 'No notification when ready'],
    solutions: ['Add progress bar with stages', 'Show estimated time remaining', 'Display friendly "Still deploying..." message instead of 502', 'Send email/notification when ready'],
  },
  {
    id: 10,
    title: 'Access Deployment',
    description: 'Finally access the deployed application',
    painPoints: ['When errors occur, only a blank screen is displayed with no error details', 'Difficult to diagnose what went wrong'],
    solutions: ['Display detailed error messages with suggested fixes and troubleshooting steps'],
  },
];

// Website Builders Journey Steps
const lovableJourneySteps: JourneyStep[] = [
  {
    id: 1,
    title: 'Create on Website Builder',
    description: 'User creates project using website builders like Claude Code, Lovable, etc.',
    painPoints: [],
    solutions: [],
  },
  {
    id: 2,
    title: 'Connect GitHub',
    description: 'Connect GitHub account in the website builder and sync project',
    painPoints: [],
    solutions: [],
  },
  {
    id: 3,
    title: 'Verify Dockerfile',
    description: 'Check if the website builder generated a proper Dockerfile',
    painPoints: [],
    solutions: [],
  },
  {
    id: 4,
    title: 'Copy Repository URL',
    description: 'Copy the GitHub repository URL from the website builder',
    painPoints: [],
    solutions: [],
  },
  {
    id: 5,
    title: 'Switch to XO Launchpad',
    description: 'Navigate to XO Launchpad',
    painPoints: ['Not seamless - requires manual switching'],
    solutions: ['One-click deployment from website builders'],
  },
  {
    id: 6,
    title: 'Select GitHub Repository & Configure',
    description: 'Follow same GitHub deployment flow: enter repo details, PAT, project name, and port',
    painPoints: ['No guidance on how to configure environment variables in Actions tab', 'No validation before submission', 'Branch name not auto-detected', 'Context switch to GitHub', 'Token not validated upfront', 'Port configuration unclear for non-technical users'],
    solutions: ['Provide step-by-step guide for configuring environment variables in Actions tab', 'Add real-time validation', 'Auto-detect default branch', 'OAuth integration instead of PAT', 'Validate token before proceeding', 'Auto-detect port from Dockerfile with helpful tooltip'],
  },
  {
    id: 7,
    title: 'Wait for Deployment',
    description: 'Wait for deployment to build and start',
    painPoints: ['No progress indicator', 'No time estimate', 'URL returns 502 error if accessed too early', 'No notification when ready'],
    solutions: ['Add progress bar with stages', 'Show estimated time remaining', 'Display friendly "Still deploying..." message instead of 502', 'Send email/notification when ready'],
  },
  {
    id: 8,
    title: 'Application Live',
    description: 'Access the deployed application',
    painPoints: [],
    solutions: [],
  },
];

// Local Build Journey Steps
const localJourneySteps: JourneyStep[] = [
  {
    id: 1,
    title: 'Signup',
    description: 'User discovers XO Launchpad and creates an account',
    painPoints: [],
    solutions: [],
  },
  {
    id: 2,
    title: 'Products → Launchpad',
    description: 'Navigate to Launchpad',
    painPoints: [],
    solutions: [],
  },
  {
    id: 3,
    title: 'Create from Scratch',
    description: 'Click "Create from Scratch" button',
    painPoints: [],
    solutions: [],
  },
  {
    id: 4,
    title: 'Select Local Build',
    description: 'Select deployment type as "Local Build"',
    painPoints: [],
    solutions: [],
  },
  {
    id: 5,
    title: 'Enter Project Details',
    description: 'Enter project name and application port',
    painPoints: ['No mention that Docker Desktop must be installed', 'Not clearly stated that Dockerfile must be present in root directory', 'No guidance that environment variables file should be in root directory'],
    solutions: ['Display Docker Desktop installation requirement before proceeding', 'Clearly state required file structure: Dockerfile and .env must be in root directory'],
  },
  {
    id: 6,
    title: 'Create Deployment',
    description: 'Click "Create Deployment" and receive Docker commands',
    painPoints: ['Docker commands shown without clear step-by-step guidance'],
    solutions: ['Provide numbered step-by-step guide for executing Docker commands'],
  },
  {
    id: 7,
    title: 'Run Docker Commands',
    description: 'Open terminal and run: docker login, docker build, docker push',
    painPoints: [],
    solutions: [],
  },
  {
    id: 8,
    title: 'Return to Dashboard',
    description: 'Go back to XO Launchpad dashboard',
    painPoints: ['No indication that pushing image doesn\'t auto-deploy'],
    solutions: ['Warn: "After pushing, click Deploy button"'],
  },
  {
    id: 9,
    title: 'Click Deploy Button',
    description: 'Open Actions menu (⋮) and click "Deploy"',
    painPoints: [],
    solutions: [],
  },
  {
    id: 10,
    title: 'Wait for Container Start',
    description: 'Wait 2+ minutes for container to start',
    painPoints: ['URL returns 502 if accessed too early', 'No proper error handling when deployment errors occur'],
    solutions: ['Replace 502 with friendly message e.g., "Still deploying, please wait"', 'Display clear error messages with actionable solutions directly in the dashboard'],
  },
  {
    id: 11,
    title: 'Access Deployment',
    description: 'Access the deployed application',
    painPoints: [],
    solutions: [],
  },
];

// Template Journey Steps
const templateJourneySteps: JourneyStep[] = [
  {
    id: 1,
    title: 'Signup',
    description: 'User discovers XO Launchpad and creates an account',
    painPoints: [],
    solutions: [],
  },
  {
    id: 2,
    title: 'Products → Launchpad',
    description: 'Navigate to Launchpad',
    painPoints: ['No onboarding tour'],
    solutions: ['Add interactive tour'],
  },
  {
    id: 3,
    title: 'Explore Templates',
    description: 'Click "Explore Templates" option',
    painPoints: [],
    solutions: [],
  },
  {
    id: 4,
    title: 'Select Template',
    description: 'Choose the required template (N8N/Phi-3-mini-4k-instruct/etc.)',
    painPoints: [],
    solutions: [],
  },
  {
    id: 5,
    title: 'Enter Project Name & Instance Size',
    description: 'Configure deployment settings',
    painPoints: [],
    solutions: [],
  },
  {
    id: 6,
    title: 'Click Create Deployment',
    description: 'Start the deployment process',
    painPoints: [],
    solutions: [],
  },
  {
    id: 7,
    title: 'Wait for Deployment',
    description: 'Deployment is being prepared',
    painPoints: ['No indication when it will be ready', 'No progress bar or status', 'Unclear what\'s happening'],
    solutions: ['Add progress indicator', 'Show deployment stages', 'Provide time estimate'],
  },
  {
    id: 8,
    title: '502 Error (if accessed early)',
    description: 'User tries to access URL too early',
    painPoints: ['Confusing 502 error message', 'Deployment errors require manual troubleshooting through documentation'],
    solutions: ['Replace 502 with friendly message e.g., "Still deploying, please wait"', 'Display clear error messages with actionable solutions directly in the dashboard'],
  },
  {
    id: 9,
    title: 'Deployment Ready',
    description: 'Public URL finally works',
    painPoints: ['No notification when ready', 'User has to keep checking'],
    solutions: ['Send email notification', 'Show browser notification', 'Add status indicator'],
  },
  {
    id: 10,
    title: 'Sign up for N8N',
    description: 'Create account in the deployed N8N instance',
    painPoints: ['No visibility into N8N subscription costs or additional charges associated with the deployed service'],
    solutions: ['Display N8N pricing tiers and usage-based cost estimates before deployment'],
  },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [currentJourney, setCurrentJourney] = useState<Journey>('template');
  const [visibleSteps, setVisibleSteps] = useState<number[]>([0]);

  const handleNext = () => {
    const steps = currentJourney === 'template' ? templateJourneySteps :
                  currentJourney === 'github' ? githubJourneySteps :
                  currentJourney === 'lovable' ? lovableJourneySteps :
                  localJourneySteps;
    
    if (visibleSteps.length < steps.length) {
      setVisibleSteps([...visibleSteps, visibleSteps.length]);
    }
  };

  const handlePrevious = () => {
    if (visibleSteps.length > 1) {
      setVisibleSteps(visibleSteps.slice(0, -1));
    }
  };

  const handleReset = () => {
    setVisibleSteps([0]);
  };

  const handleBack = () => {
    if (currentScreen === 'flowchart') {
      setCurrentScreen('journeys');
      setVisibleSteps([0]);
    } else if (currentScreen === 'journeys') {
      setCurrentScreen('tasks');
    } else if (currentScreen === 'signup') {
      setCurrentScreen('tasks');
    } else if (currentScreen === 'tasks') {
      setCurrentScreen('landing');
    }
  };

  const handleJourneySelect = (journey: Journey) => {
    setCurrentJourney(journey);
    setVisibleSteps([0]);
    setCurrentScreen('flowchart');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <AnimatePresence mode="wait">
        {/* Landing Screen */}
        {currentScreen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 700,
              color: COLORS.text,
              marginBottom: '1rem',
            }}>
              XO Launchpad
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: COLORS.textLight,
              marginBottom: '3rem',
            }}>
              User Experience Analysis & Optimization
            </p>
            <button
              onClick={() => setCurrentScreen('tasks')}
              style={{
                padding: '1rem 2rem',
                background: COLORS.primary,
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Let's Dive In →
            </button>
          </motion.div>
        )}

        {/* Task Selection Screen */}
        {currentScreen === 'tasks' && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              minHeight: '100vh',
              padding: '4rem 2rem',
            }}
          >
            <button
              onClick={handleBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: 'none',
                color: COLORS.textLight,
                fontSize: '0.875rem',
                cursor: 'pointer',
                marginBottom: '2rem',
              }}
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: COLORS.text,
              marginBottom: '3rem',
            }}>
              Select a Task
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
            }}>
              {/* Task 1 */}
              <div
                onClick={() => setCurrentScreen('journeys')}
                style={{
                  padding: '2rem',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.primary;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <BarChart2 size={32} color={COLORS.primary} style={{ marginBottom: '1rem' }} />
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: '0.5rem',
                }}>
                  Task 1: User Journey Analysis & Optimization
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: COLORS.textLight,
                }}>
                  Analyze user journeys across different deployment methods
                </p>
              </div>

              {/* Task 2 */}
              <div
                onClick={() => setCurrentScreen('signup')}
                style={{
                  padding: '2rem',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.primary;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Target size={32} color={COLORS.primary} style={{ marginBottom: '1rem' }} />
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: '0.5rem',
                }}>
                  Task 2: Signup Strategy
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: COLORS.textLight,
                }}>
                  Creative approaches to drive signups and growth
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Journey Selection Screen */}
        {currentScreen === 'journeys' && (
          <motion.div
            key="journeys"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              minHeight: '100vh',
              padding: '4rem 2rem',
            }}
          >
            <button
              onClick={handleBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: 'none',
                color: COLORS.textLight,
                fontSize: '0.875rem',
                cursor: 'pointer',
                marginBottom: '2rem',
              }}
            >
              <ArrowLeft size={18} />
              Back to Tasks
            </button>

            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: COLORS.text,
              marginBottom: '1rem',
            }}>
              Select User Journey
            </h2>
            <p style={{
              fontSize: '1rem',
              color: COLORS.textLight,
              marginBottom: '3rem',
            }}>
              Choose a deployment method to analyze
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
            }}>
              {/* Template Journey */}
              <div
                onClick={() => handleJourneySelect('template')}
                style={{
                  padding: '2rem',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.primary;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Package size={32} color={COLORS.primary} style={{ marginBottom: '1rem' }} />
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: '0.5rem',
                }}>
                  Template Deployment
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: COLORS.textLight,
                }}>
                  Deploy using pre-built templates
                </p>
              </div>

              {/* GitHub Journey */}
              <div
                onClick={() => handleJourneySelect('github')}
                style={{
                  padding: '2rem',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.primary;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <GitBranch size={32} color={COLORS.primary} style={{ marginBottom: '1rem' }} />
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: '0.5rem',
                }}>
                  GitHub Repository
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: COLORS.textLight,
                }}>
                  Deploy from GitHub repository
                </p>
              </div>

              {/* Website Builders Journey */}
              <div
                onClick={() => handleJourneySelect('lovable')}
                style={{
                  padding: '2rem',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.primary;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Heart size={32} color={COLORS.primary} style={{ marginBottom: '1rem' }} />
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: '0.5rem',
                }}>
                  Website Builders
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: COLORS.textLight,
                }}>
                  Deploy from Claude Code, Lovable, etc.
                </p>
              </div>

              {/* Local Build Journey */}
              <div
                onClick={() => handleJourneySelect('local')}
                style={{
                  padding: '2rem',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.primary;
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Monitor size={32} color={COLORS.primary} style={{ marginBottom: '1rem' }} />
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: '0.5rem',
                }}>
                  Local Build
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: COLORS.textLight,
                }}>
                  Build locally and push Docker image
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Flowchart View */}
        {currentScreen === 'flowchart' && (
          <FlowchartView
            journey={currentJourney}
            visibleSteps={visibleSteps}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onReset={handleReset}
            onBack={handleBack}
          />
        )}

        {/* Signup Strategy Screen */}
        {currentScreen === 'signup' && (
          <SignupStrategy onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Flowchart View Component
function FlowchartView({
  journey,
  visibleSteps,
  onNext,
  onPrevious,
  onReset,
  onBack,
}: {
  journey: Journey;
  visibleSteps: number[];
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onBack: () => void;
}) {
  const steps = journey === 'template' ? templateJourneySteps :
                journey === 'github' ? githubJourneySteps :
                journey === 'lovable' ? lovableJourneySteps :
                localJourneySteps;

  const journeyTitles = {
    template: 'Template Deployment',
    github: 'GitHub Repository',
    lovable: 'Website Builders',
    local: 'Local Build',
  };

  return (
    <motion.div
      key="flowchart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '1.5rem 2rem',
        borderBottom: `1px solid ${COLORS.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: COLORS.textLight,
              fontSize: '0.875rem',
              cursor: 'pointer',
              marginBottom: '0.5rem',
            }}
          >
            <ArrowLeft size={18} />
            Back to Journeys
          </button>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
          }}>
            {journeyTitles[journey]}
          </h2>
        </div>
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: COLORS.textLight,
          }}>
            Step {visibleSteps.length} of {steps.length}
          </span>
          <button
            onClick={onReset}
            style={{
              padding: '0.5rem 1rem',
              background: 'white',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              color: COLORS.text,
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
      }}>
        {/* Left Side - Flowchart */}
        <div style={{
          flex: 1,
          padding: '3rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%',
          }}>
            {visibleSteps.map((stepIndex, index) => {
              const step = steps[stepIndex];
              const isLast = index === visibleSteps.length - 1;

              return (
                <div key={step.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: 'white',
                      border: `2px solid ${isLast ? COLORS.primary : COLORS.border}`,
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      boxShadow: isLast ? '0 4px 12px rgba(16, 185, 129, 0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                    }}>
                      <div style={{
                        background: isLast ? COLORS.primary : COLORS.border,
                        color: isLast ? 'white' : COLORS.text,
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}>
                        {step.id}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: 600,
                          color: COLORS.text,
                          marginBottom: '0.5rem',
                        }}>
                          {step.title}
                        </h3>
                        <p style={{
                          fontSize: '0.875rem',
                          color: COLORS.textLight,
                          margin: 0,
                        }}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Arrow */}
                  {!isLast && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '0.75rem 0',
                    }}>
                      <ArrowDown size={24} color={COLORS.textLight} />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
              justifyContent: 'center',
            }}>
              <button
                onClick={onPrevious}
                disabled={visibleSteps.length === 1}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: visibleSteps.length === 1 ? COLORS.border : 'white',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: visibleSteps.length === 1 ? COLORS.textLight : COLORS.text,
                  cursor: visibleSteps.length === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Previous Step
              </button>
              <button
                onClick={onNext}
                disabled={visibleSteps.length === steps.length}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: visibleSteps.length === steps.length ? COLORS.border : COLORS.primary,
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'white',
                  cursor: visibleSteps.length === steps.length ? 'not-allowed' : 'pointer',
                }}
              >
                Next Step
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Pain Points & Solutions */}
        <div style={{
          width: '400px',
          borderLeft: `1px solid ${COLORS.border}`,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
          {/* Fixed Header */}
          <div style={{
            padding: '1.5rem 2rem',
            borderBottom: `1px solid ${COLORS.border}`,
            background: 'white',
            flexShrink: 0,
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: COLORS.text,
            }}>
              Pain Points & Solutions
            </h3>
          </div>

          {/* Scrollable Content */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem 2rem 2rem 2rem',
          }}>
            {visibleSteps.map((stepIndex) => {
              const step = steps[stepIndex];
              if (step.painPoints.length === 0 && step.solutions.length === 0) return null;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginBottom: '2rem',
                    paddingBottom: '2rem',
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: COLORS.textLight,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                  }}>
                    Step {step.id}: {step.title}
                  </h4>

                  {step.painPoints.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                      }}>
                        <AlertTriangle size={16} color="#ef4444" />
                        <h5 style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#ef4444',
                        }}>
                          Pain Points
                        </h5>
                      </div>
                      {step.painPoints.map((point, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '0.375rem',
                            padding: '0.75rem',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                            color: '#991b1b',
                          }}
                        >
                          {point}
                        </div>
                      ))}
                    </div>
                  )}

                  {step.solutions.length > 0 && (
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                      }}>
                        <CheckCircle size={16} color="#10b981" />
                        <h5 style={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: '#10b981',
                        }}>
                          Solutions
                        </h5>
                      </div>
                      {step.solutions.map((solution, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '0.375rem',
                            padding: '0.75rem',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                            color: '#065f46',
                          }}
                        >
                          {solution}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;

