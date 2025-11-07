import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Building2, Megaphone, MapPin } from 'lucide-react';

const COLORS = {
  primary: '#10b981',
  text: '#1f2937',
  textLight: '#6b7280',
  border: '#e5e7eb',
};

interface SignupStrategyProps {
  onBack: () => void;
}

export default function SignupStrategy({ onBack }: SignupStrategyProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <motion.div
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
          }}
        >
          <ArrowLeft size={18} />
          Back to Tasks
        </button>
        <div style={{
          fontSize: '0.875rem',
          color: COLORS.textLight,
        }}>
          Slide {currentSlide + 1} of {totalSlides}
        </div>
      </div>

      {/* Slide Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '3rem',
        overflow: 'auto',
      }}>
        <div style={{
          maxWidth: '1000px',
          width: '100%',
        }}>
          {currentSlide === 0 && <Slide1 />}
          {currentSlide === 1 && <Slide2 />}
          {currentSlide === 2 && <Slide3 />}
          {currentSlide === 3 && <Slide4 />}
          {currentSlide === 4 && <Slide5 />}
          {currentSlide === 5 && <Slide6 />}
          {currentSlide === 6 && <Slide7 />}
          {currentSlide === 7 && <Slide8 />}
          {currentSlide === 8 && <Slide9 />}
          {currentSlide === 9 && <Slide10 />}
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{
        padding: '1.5rem 2rem',
        borderTop: `1px solid ${COLORS.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          style={{
            padding: '0.75rem 1.5rem',
            border: `1px solid ${COLORS.border}`,
            background: 'white',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
            opacity: currentSlide === 0 ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <ChevronLeft size={18} />
          Previous
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            background: COLORS.primary,
            color: 'white',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: currentSlide === totalSlides - 1 ? 'not-allowed' : 'pointer',
            opacity: currentSlide === totalSlides - 1 ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}

// Slide 1: Why are signups important?
function Slide1() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center' }}
    >
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 700,
        marginBottom: '3rem',
        color: COLORS.text,
      }}>
        <span style={{ fontSize: '5rem', fontWeight: 900 }}>WHY</span> are signups important?
      </h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'flex-start',
        maxWidth: '700px',
        margin: '0 auto',
        fontSize: '1.5rem',
        color: COLORS.text,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: COLORS.primary,
            flexShrink: 0,
          }} />
          <div>Attractive metric while raising money (Short Term)</div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: COLORS.primary,
            flexShrink: 0,
          }} />
          <div>More signups = more product adoption = More Growth</div>
        </div>
      </div>
    </motion.div>
  );
}

// Slide 2: Who is the ideal user persona? (FIXED FORMATTING)
function Slide2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center' }}
    >
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 700,
        marginBottom: '3rem',
        color: COLORS.text,
      }}>
        <span style={{ fontSize: '5rem', fontWeight: 900 }}>WHO</span> is the ideal user persona?
      </h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'flex-start',
        maxWidth: '850px',
        margin: '0 auto',
        fontSize: '1.25rem',
        color: COLORS.text,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
        }}>
          <div style={{
            background: COLORS.primary,
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            flexShrink: 0,
          }}>1</div>
          <div style={{ paddingTop: '0.5rem' }}>Startup founders for B2B</div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
        }}>
          <div style={{
            background: COLORS.primary,
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            flexShrink: 0,
          }}>2</div>
          <div style={{ paddingTop: '0.5rem' }}>People, typically from the age of 18 to 30, are the earliest adopters of these platforms</div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
        }}>
          <div style={{
            background: COLORS.primary,
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            flexShrink: 0,
          }}>3</div>
          <div style={{ paddingTop: '0.5rem' }}>Communities of Builders</div>
        </div>
      </div>
    </motion.div>
  );
}

// Slide 3: How I targeted these communities
function Slide3() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center' }}
    >
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 700,
        marginBottom: '2rem',
        color: COLORS.text,
      }}>
        <span style={{ fontSize: '5rem', fontWeight: 900 }}>HOW</span> I targeted these communities
      </h1>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'left',
      }}>
        <div style={{
          background: '#fef3c7',
          border: '2px solid #fbbf24',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          fontSize: '1.125rem',
          color: '#78350f',
        }}>
          <strong>Note:</strong> I started off by getting sign-ups from my inner circle (friends, family, roommates, etc.). But that was short-term.
        </div>
        <p style={{
          fontSize: '1.5rem',
          color: COLORS.text,
          lineHeight: 1.6,
        }}>
          Then I moved to targeting communities through various mediums, as I mentioned earlier.
        </p>
      </div>
    </motion.div>
  );
}

// Slide 4: Target 1 - Articles
function Slide4() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          background: COLORS.primary,
          color: 'white',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 700,
        }}>1</div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: COLORS.text,
          margin: 0,
        }}>
          Target 1: Articles
        </h2>
      </div>
      <p style={{
        fontSize: '1.25rem',
        color: COLORS.text,
        marginBottom: '2rem',
        lineHeight: 1.6,
      }}>
        Wrote a Medium article about how I met Suraj at SF and spoke more about XO on Medium with AI automation, AI tools, and tags to target our ideal user persona. Attached referral links throughout the article.
      </p>
      <a
        href="https://medium.com/@Sachin_Jain__/a-popsicle-a-founder-and-the-ai-development-problem-nobodys-talking-about-86e8380d1afd"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          color: COLORS.primary,
          fontSize: '1rem',
          marginBottom: '2rem',
          textDecoration: 'underline',
        }}
      >
        Read the article →
      </a>
      <div style={{
        border: `2px solid ${COLORS.border}`,
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <img
          src="/images/medium-article.png"
          alt="Medium Article Screenshot"
          style={{
            width: '100%',
            display: 'block',
          }}
        />
      </div>
    </motion.div>
  );
}

// Slide 5: Target 2 - X post (ADDED LINK)
function Slide5() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          background: COLORS.primary,
          color: 'white',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 700,
        }}>2</div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: COLORS.text,
          margin: 0,
        }}>
          Target 2: X Post
        </h2>
      </div>
      <p style={{
        fontSize: '1.25rem',
        color: COLORS.text,
        marginBottom: '1rem',
        lineHeight: 1.6,
      }}>
        Because this is where I have personally found out about many great tools.
      </p>
      <a
        href="https://x.com/SachinJain2306/status/1981613528286220309"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          color: COLORS.primary,
          fontSize: '1rem',
          marginBottom: '2rem',
          textDecoration: 'underline',
        }}
      >
        View the post →
      </a>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        border: `2px solid ${COLORS.border}`,
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <img
          src="/images/x-post.png"
          alt="X (Twitter) Post Screenshot"
          style={{
            width: '100%',
            display: 'block',
          }}
        />
      </div>
    </motion.div>
  );
}

// Slide 6: Target 3 - University Groups (WITH LOGOS)
function Slide6() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          background: COLORS.primary,
          color: 'white',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 700,
        }}>3</div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: COLORS.text,
          margin: 0,
        }}>
          Target 3: University Groups
        </h2>
      </div>
      
      <p style={{
        fontSize: '1.25rem',
        color: COLORS.text,
        marginBottom: '3rem',
        lineHeight: 1.6,
      }}>
        Found my friends from different universities and asked them to share their referral link with a short message in different University groups.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4rem',
        flexWrap: 'wrap',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <img
            src="/images/sjsu-logo.png"
            alt="San Jose State University"
            style={{
              height: '80px',
              width: 'auto',
            }}
          />
          <div style={{
            fontSize: '0.875rem',
            color: COLORS.textLight,
            fontWeight: 600,
          }}>San Jose State University</div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <img
            src="/images/utd-logo.png"
            alt="UT Dallas"
            style={{
              height: '80px',
              width: 'auto',
            }}
          />
          <div style={{
            fontSize: '0.875rem',
            color: COLORS.textLight,
            fontWeight: 600,
          }}>University of Texas at Dallas</div>
        </div>
      </div>
    </motion.div>
  );
}

// Slide 7: Target 4 - UTD Social Media (WITH INSTAGRAM MOCKUP)
function Slide7() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          background: COLORS.primary,
          color: 'white',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 700,
        }}>4</div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: COLORS.text,
          margin: 0,
        }}>
          Target 4: UTD Social Media
        </h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Building2 size={32} color={COLORS.primary} />
        <p style={{
          fontSize: '1.25rem',
          color: COLORS.text,
          margin: 0,
          lineHeight: 1.6,
        }}>
          Having worked for UTD's social media, asked a few juniors to post about XO as a part of their "Tech Tuesday" social media campaign.
        </p>
      </div>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        border: `2px solid ${COLORS.border}`,
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <img
          src="/images/utd-jsom-instagram.png"
          alt="UTD JSOM Instagram Account"
          style={{
            width: '100%',
            display: 'block',
          }}
        />
      </div>
    </motion.div>
  );
}

// Slide 8: Target 5 - Yudi's Community (WITH BOTH IMAGES SIDE BY SIDE)
function Slide8() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ paddingTop: '3rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          background: COLORS.primary,
          color: 'white',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>5</span>
        </div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: COLORS.text,
          margin: 0,
        }}>
          Target 5: Yudi's Student Community
        </h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Megaphone size={32} color={COLORS.primary} />
        <p style={{
          fontSize: '1.25rem',
          color: COLORS.text,
          margin: 0,
        }}>
          <strong>1000+ members</strong> with wide reach across student communities
        </p>
      </div>
      <p style={{
        fontSize: '1rem',
        color: COLORS.textLight,
        marginBottom: '2rem',
        lineHeight: 1.6,
        fontStyle: 'italic',
      }}>
        "Hey guys, I came across this really interesting tool called XO, which is similar to Lovable but on steroids. It's an AI-powered platform where you can not only prototype but also deploy entire full-stack applications using simple text prompts. It handles the database, authentication, and all the backend logic, which is pretty amazing. I'm still exploring all its features, but it seems like a massive time-saver for new projects. If you're interested in checking it out, they have a referral program where we all get some free credits if you complete a quick 1-minute signup."
      </p>
      <div style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        <div style={{
          maxWidth: '400px',
          border: `2px solid ${COLORS.border}`,
          borderRadius: '0.75rem',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          <img
            src="/images/yudi-community.png"
            alt="Yudi's Community WhatsApp"
            style={{
              width: '100%',
              display: 'block',
            }}
          />
        </div>
        <div style={{
          maxWidth: '350px',
          border: `2px solid ${COLORS.border}`,
          borderRadius: '0.75rem',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          <img
            src="/images/meetup-photo.jpg"
            alt="Community Meetup"
            style={{
              width: '100%',
              display: 'block',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Slide 9: Target 6 - SF Tech Meetups
function Slide9() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          background: COLORS.primary,
          color: 'white',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 700,
        }}>6</div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: COLORS.text,
          margin: 0,
        }}>
          Target 6: SF Tech Meetups
        </h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <MapPin size={32} color={COLORS.primary} />
        <p style={{
          fontSize: '1.25rem',
          color: COLORS.text,
          margin: 0,
          lineHeight: 1.6,
        }}>
          Haven't been able to attend one lately but plan on sticking these in Frontier Tower and possibly other venues dedicated for tech meetups!
        </p>
      </div>
      <div style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: '3rem',
      }}>
        <div style={{
          maxWidth: '350px',
          border: `2px solid ${COLORS.border}`,
          borderRadius: '0.75rem',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}>
          <img
            src="/images/qr-code.png"
            alt="QR Code for XO"
            style={{
              width: '100%',
              display: 'block',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}



// Slide 10: Mission Accomplished!
function Slide10() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '4rem',
      }}
    >
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 900,
        color: COLORS.primary,
        marginBottom: '3rem',
      }}>
        Mission Accomplished! 🎉
      </h1>
      <div style={{
        maxWidth: '800px',
        border: `3px solid ${COLORS.primary}`,
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)',
      }}>
        <img
          src="/images/leaderboard.png"
          alt="XO Leaderboard - Rank #4 Globally"
          style={{
            width: '100%',
            display: 'block',
          }}
        />
      </div>
      <p style={{
        fontSize: '1.5rem',
        color: COLORS.textLight,
        marginTop: '2rem',
        fontWeight: 600,
      }}>
        Rank #4 Globally • 1,390 Total Points • 25 Invites
      </p>
    </motion.div>
  );
}

