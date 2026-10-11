# CTO / VP of Engineering - Take-Home Challenge

**Time budget: ~4 hours** (Part A ≈ 2.5-3h, Part B ≈ 1h). Hard limits on length are part of the exercise - executive writing is compression.

## The situation

You are taking ownership of the technology organization behind a **regulated, real-money transactional platform** (player wallets, deposits via third-party payment providers, withdrawals, high transaction volume - money correctness is existential, and regulators are real).

**The platform today:**

- A **modular monolith** (TypeScript/Node, PostgreSQL), deployed **once per region**. Three regions live. Each regional deployment serves ~10 client brands (white-label: one codebase, many branded frontends) - ~30 brands total, roughly doubling in the next 12 months.
- **100+ payment provider integrations**, hand-built. Each new market needs new local providers; each integration currently takes 2-3 weeks of a senior engineer. This is the single biggest consumer of senior capacity.
- Regional deployments have **drifted**: same codebase, but config, promotional features, and operational scripts differ per region. One region's config file is ~25k lines. Launching region 3 took 4 months against a 6-week plan.
- A **central CRM/data platform** was recently built alongside: it replicates data from all regions into a warehouse and serves cross-region views. It is the first genuinely centralized component and the team is proud of it.
- **Engineering org: ~20 engineers** across payments/platform, CRM/data, and web squads. Knowledge is concentrated in a few senior people. Money-impacting incidents are trending up (duplicate credits from provider callbacks, stuck withdrawal batches, a float-rounding regulatory report amendment).

**The commitment you inherit** (already made to the board): **two new markets live in the next 6 months.** Each has local payment providers and its own regulatory quirks. Brand count doubles across the estate in 12 months.

## Part A - Platform & organization strategy memo (max 3 pages)

Write the memo you would send to the CEO and your engineering leads in your first month. It must take a position on:

1. **Consolidate or replicate?** The core architectural question: keep cloning per-region deployments (fast to start, drifting apart), or move toward shared/multi-tenant services (leverage, but a migration on a live money system). Or something in between - but be specific about *what* is shared and *what* stays regional, and why. "It depends" without a decision is a failing memo; a decision without acknowledging what it costs is worse.
2. **What is standardized vs. allowed to diverge** across regions/brands - config, features, ops - and how you stop the 25k-line-config problem from becoming a 50k-line one.
3. **Payments strategy** - 100+ integrations growing with every market: keep hand-building, invest in an internal integration platform/abstraction, buy/partner with an orchestration provider, or some mix. Tie it to the 6-month commitment: payment integrations are historically the long pole of every launch.
4. **Team topology** - how ~20 engineers (plus the hiring you'd do) map onto your chosen architecture. If your architecture and your org chart disagree, say which one moves.
5. **Sequencing** - what happens in months 1-6 such that both markets launch *and* your strategic direction advances. Include a section titled **"What I will not do in these 6 months"** - this section is scored.
6. **Risks** - the top 3 ways this plan fails, and your early-warning signal for each.

Audience note: the CEO reads pages 1-2; your leads read all 3. Write accordingly.

## Part B - Hands-on: exactly-once crediting (max 2 pages incl. diagrams)

The most damaging recent incident class: a payment provider delivers a **duplicate or delayed success callback**, and a player's deposit is credited twice. Providers retry aggressively, sometimes concurrently, sometimes hours late; several providers share one callback endpoint shape.

Design the mechanism that makes wallet crediting **exactly-once** regardless of provider behavior. Deliver:

1. The **schema** for the tables involved (funding transaction, wallet, ledger - your design).
2. A **sequence diagram** of the callback path, including the duplicate-delivery and concurrent-delivery cases and where each one is stopped.
3. **Pseudo-code** for the callback handler, precise about transaction boundaries and locking/uniqueness strategy.
4. Brief answers: what happens if the process crashes after commit but before the provider gets a 200? How do you *detect* residual drift in production (balance vs. ledger), and what runs when drift is found?

This part exists because we believe people setting technical direction must still be able to design the load-bearing 200 lines. A senior backend engineer will walk through it with you in your first interview.

## Deliverables

One PDF or Markdown submission: Part A memo + Part B design. Diagrams may be hand-drawn and photographed - content over polish.

## Rules

- **AI tools are allowed.** Disclose at the end what you used them for. You own every position taken - the interviews will pressure-test the memo's decisions and the design's failure modes, and reasoning you cannot defend is treated as absent.
- Where the brief is silent, invent reasonable context and state the assumption inline.
- Page limits are enforced; we stop reading past them.
