"use client";

import React from "react";

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  progress: number;
  target: number;
}

export interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  unlockedAt?: string;
  category: "streak" | "mastery" | "safety" | "olympiad";
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  city: string;
  grade: string;
  xp: number;
  streak: number;
  isCurrent: boolean;
  league: string;
}

interface GamificationHubProps {
  xp: number;
  streak: number;
  level: number;
  levelTitle: string;
  currentLevelBaseXp: number;
  nextLevelXp: number;
  quests: Quest[];
  badges: BadgeItem[];
  soundEnabled: boolean;
  onToggleSound: () => void;
  onClaimQuest: (questId: string) => void;
  lang?: "en" | "hi";
}

const LEAGUES = [
  { name: "Bronze League", minXp: 0, color: "#cd7f32" },
  { name: "Silver League", minXp: 400, color: "#94a3b8" },
  { name: "Gold League", minXp: 900, color: "#fbbf24" },
  { name: "Diamond League", minXp: 1800, color: "#38bdf8" },
  { name: "Sage Master League", minXp: 3500, color: "#a855f7" }
];

const PEER_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "Diya Sharma", city: "Bengaluru", grade: "Class 8", xp: 2840, streak: 14, isCurrent: false, league: "Diamond" },
  { rank: 2, name: "Aarav Patel (You)", city: "Mumbai", grade: "Class 7", xp: 2150, streak: 7, isCurrent: true, league: "Diamond" },
  { rank: 3, name: "Kabir Sengupta", city: "Kolkata", grade: "Class 7", xp: 1980, streak: 9, isCurrent: false, league: "Diamond" },
  { rank: 4, name: "Ananya Iyer", city: "Chennai", grade: "Class 6", xp: 1720, streak: 6, isCurrent: false, league: "Gold" },
  { rank: 5, name: "Vihaan Verma", city: "Delhi NCR", grade: "Class 8", xp: 1610, streak: 5, isCurrent: false, league: "Gold" },
  { rank: 6, name: "Ishaan Rao", city: "Hyderabad", grade: "Class 7", xp: 1450, streak: 4, isCurrent: false, league: "Gold" }
];

export default function GamificationHub({
  xp,
  streak,
  level,
  levelTitle,
  currentLevelBaseXp,
  nextLevelXp,
  quests,
  badges,
  soundEnabled,
  onToggleSound,
  onClaimQuest,
  lang = "en"
}: GamificationHubProps) {
  const levelProgressPercent = Math.min(
    100,
    Math.max(0, Math.round(((xp - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100))
  );

  const activeLeague = LEAGUES.slice().reverse().find((l) => xp >= l.minXp) || LEAGUES[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Hero Level & Streak Card */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, rgba(30, 27, 75, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)",
          border: "1px solid rgba(129, 140, 248, 0.35)",
          boxShadow: "0 8px 32px -4px rgba(79, 70, 229, 0.25)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span className="badge badge-purple" style={{ fontSize: "0.82rem", padding: "0.3rem 0.75rem" }}>
                Level {level}: {levelTitle}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  background: "rgba(251, 191, 36, 0.15)",
                  color: "#fcd34d",
                  border: "1px solid rgba(251, 191, 36, 0.35)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "999px",
                  fontSize: "0.78rem",
                  fontWeight: 700
                }}
              >
                {activeLeague.name}
              </span>
            </div>
            <h2 style={{ fontSize: "1.65rem", margin: "0.4rem 0 0.2rem 0", color: "#ffffff", fontWeight: 800 }}>
              Learner Mastery &amp; Daily Achievements
            </h2>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Earn XP by completing daily Adhiti-to-Prasar learning loops, cognitive challenge tiers, and mock assessments.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <button
              type="button"
              onClick={onToggleSound}
              className="control-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: soundEnabled ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.05)",
                borderColor: soundEnabled ? "#10b981" : "var(--border)"
              }}
              title="Toggle Melodic Reward Chime"
            >
              <span>{soundEnabled ? "🔊 Sound FX On" : "🔇 Sound FX Off"}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar towards Next Level */}
        <div style={{ marginTop: "1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.84rem", marginBottom: "0.4rem" }}>
            <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>
              Progress to Level {level + 1}
            </span>
            <span style={{ color: "#a5b4fc", fontWeight: 700 }}>
              {xp} / {nextLevelXp} XP ({levelProgressPercent}%)
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "12px",
              background: "rgba(15, 23, 42, 0.8)",
              borderRadius: "999px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <div
              style={{
                width: `${levelProgressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #6366f1 0%, #38bdf8 50%, #10b981 100%)",
                borderRadius: "999px",
                transition: "width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: "0 0 12px rgba(99, 102, 241, 0.6)"
              }}
            />
          </div>
        </div>

        {/* Highlight Stats Pill Grid */}
        <div className="grid-3" style={{ marginTop: "1.25rem" }}>
          <div
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "12px",
              padding: "0.85rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}
          >
            <div style={{ fontSize: "2rem" }}>🔥</div>
            <div>
              <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#fbbf24" }}>{streak} Days</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                Active Study Streak
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: "12px",
              padding: "0.85rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}
          >
            <div style={{ fontSize: "2rem" }}>⚡</div>
            <div>
              <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#818cf8" }}>{xp} XP</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                Total Mastery Points
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "12px",
              padding: "0.85rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}
          >
            <div style={{ fontSize: "2rem" }}>🏆</div>
            <div>
              <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#34d399" }}>
                {badges.filter((b) => b.earned).length} / {badges.length}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                Badges Unlocked
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Daily Quests and Leaderboard */}
      <div className="grid-2">
        {/* Daily Quests Card */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="badge badge-green">Daily Rituals</span>
              <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Today Quests</h3>
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Resets in 6h 40m</span>
          </div>
          <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Complete your daily learning habits to maintain your streak and unlock bonus XP.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {quests.map((q) => {
              const isReadyToClaim = q.progress >= q.target && !q.completed;
              return (
                <div
                  key={q.id}
                  style={{
                    background: q.completed ? "rgba(16, 185, 129, 0.08)" : "var(--surface-elevated)",
                    border: `1px solid ${q.completed ? "rgba(16, 185, 129, 0.3)" : "var(--border)"}`,
                    borderRadius: "12px",
                    padding: "0.85rem 1rem",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ fontSize: "1rem" }}>{q.completed ? "✅" : "🎯"}</span>
                        <span style={{ fontWeight: 700, color: q.completed ? "#34d399" : "#ffffff", fontSize: "0.92rem" }}>
                          {q.title}
                        </span>
                      </div>
                      <p style={{ margin: "0.25rem 0 0 1.4rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                        {q.description}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          background: "rgba(99, 102, 241, 0.2)",
                          color: "#c7d2fe",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "6px",
                          fontWeight: 700,
                          fontSize: "0.78rem"
                        }}
                      >
                        +{q.xpReward} XP
                      </span>
                    </div>
                  </div>

                  {/* Micro Progress Bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.6rem" }}>
                    <div
                      style={{
                        flex: 1,
                        height: "6px",
                        background: "rgba(255, 255, 255, 0.08)",
                        borderRadius: "999px",
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(100, (q.progress / q.target) * 100)}%`,
                          height: "100%",
                          background: q.completed ? "#10b981" : "#6366f1",
                          borderRadius: "999px"
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                      {q.progress} / {q.target}
                    </span>
                    {isReadyToClaim && (
                      <button
                        type="button"
                        onClick={() => onClaimQuest(q.id)}
                        className="btn btn-primary"
                        style={{ padding: "0.25rem 0.6rem", fontSize: "0.75rem", height: "26px" }}
                      >
                        Claim
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Peer League Leaderboard */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="badge badge-warn">Diamond Tier</span>
              <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Weekly Peer League</h3>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 700 }}>Top 3 Promote</span>
          </div>
          <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", marginBottom: "0.85rem" }}>
            Ranked by weekly challenge and lesson mastery points among verified grade-level peers.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            {PEER_LEADERBOARD.map((peer) => {
              const isTop3 = peer.rank <= 3;
              return (
                <div
                  key={peer.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    background: peer.isCurrent
                      ? "rgba(99, 102, 241, 0.22)"
                      : "var(--surface-elevated)",
                    border: peer.isCurrent
                      ? "1px solid rgba(129, 140, 248, 0.5)"
                      : "1px solid var(--border)",
                    boxShadow: peer.isCurrent ? "0 0 12px rgba(99, 102, 241, 0.25)" : "none"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "999px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        background:
                          peer.rank === 1
                            ? "#fbbf24"
                            : peer.rank === 2
                            ? "#94a3b8"
                            : peer.rank === 3
                            ? "#cd7f32"
                            : "rgba(255, 255, 255, 0.08)",
                        color: isTop3 ? "#0f172a" : "#cbd5e1"
                      }}
                    >
                      {peer.rank}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.88rem", fontWeight: peer.isCurrent ? 800 : 600, color: peer.isCurrent ? "#ffffff" : "var(--text)" }}>
                        {peer.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {peer.city} · {peer.grade} · 🔥 {peer.streak}d
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#818cf8" }}>
                      {peer.xp} XP
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {peer.league} Tier
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Badges and Trophies Gallery */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="badge badge-purple">Milestones</span>
            <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Skill &amp; Habit Trophy Gallery</h3>
          </div>
          <span style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            {badges.filter((b) => b.earned).length} of {badges.length} Collected
          </span>
        </div>
        <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Milestone trophies awarded upon mastering specific curriculum skills, Olympiad challenge tiers, and disciplined study habits.
        </p>

        <div className="grid-3">
          {badges.map((b) => (
            <div
              key={b.id}
              style={{
                background: b.earned ? "rgba(15, 23, 42, 0.85)" : "rgba(15, 23, 42, 0.4)",
                border: `1px solid ${b.earned ? "rgba(99, 102, 241, 0.35)" : "rgba(255, 255, 255, 0.05)"}`,
                borderRadius: "12px",
                padding: "1rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                opacity: b.earned ? 1 : 0.55,
                transition: "all 0.2s ease"
              }}
            >
              <div
                style={{
                  fontSize: "1.85rem",
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: b.earned ? "rgba(99, 102, 241, 0.15)" : "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${b.earned ? "rgba(129, 140, 248, 0.3)" : "rgba(255, 255, 255, 0.06)"}`
                }}
              >
                {b.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: b.earned ? "#ffffff" : "var(--text-muted)" }}>
                    {b.name}
                  </span>
                  {b.earned && (
                    <span style={{ fontSize: "0.7rem", color: "#34d399", fontWeight: 700 }}>
                      ✓
                    </span>
                  )}
                </div>
                <p style={{ margin: "0.2rem 0 0 0", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                  {b.description}
                </p>
                {b.unlockedAt && (
                  <span style={{ display: "inline-block", marginTop: "0.35rem", fontSize: "0.72rem", color: "#a5b4fc" }}>
                    Unlocked: {b.unlockedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
