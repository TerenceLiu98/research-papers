---
title: "Measuring Agenda Setting in Interactive Political Communication"
type: paper
authors:
  - Erin L. Rossiter
year: null
tags:
  - political-communication
  - agenda-setting
  - text-as-data
  - topic-modeling
  - topic-segmentation
---

## TL;DR

This paper measures agenda-setting power inside debates, deliberations, and discussions with [[Speaker Identity for Topic Segmentation]] (SITS), a topic model that jointly infers discussion topics, turn-level topic shifts, and each speaker's propensity to shift the topic. Three validation exercises support the inferred shifts, topics, and segments. Applications to U.S. presidential debates, in-person deliberations, and online discussions indicate that agenda setting is distinct from merely speaking more or interrupting and is associated with shaping an interaction's outcome.

## Research Question

How can researchers identify which participants set the agenda during an interaction, and does this form of agenda-setting power help explain the outcomes of political debates, deliberations, and discussions?

## Motivation

Most agenda-setting research studies attention across media, institutions, or long periods. Those approaches do not identify the moment-to-moment negotiation of attention when participants take turns speaking. Common participation measures such as word counts, talk time, and interruptions capture who participates, but not who redirects others toward a preferred issue or framing. The paper therefore treats the interaction's topical agenda, the locations of topic shifts, and speakers' relative agenda-setting abilities as jointly latent quantities.

## Contributions

- Defines [[Interactive Agenda Setting|interactive agenda setting]] as a speaker's ability to shift discussion toward a preferred topic and sustain others' attention on it.
- Adapts the parametric SITS model to estimate topics, topic segments, and speaker-level agenda-setting propensity simultaneously from turn-structured text.
- Validates three parts of the measurement strategy: detected shift locations, semantic topic coherence, and segment coherence.
- Shows that agenda setting is empirically distinct from the quantity of participation in an in-person deliberation study.
- Connects greater estimated agenda-setting ability with influence over group recommendations and with obtaining a preferred outcome in incentivized online discussions.

## Method

SITS extends Latent Dirichlet Allocation by structuring a discussion as a sequence of speaking turns. Each speaker $m$ has a topic-shift probability $\pi_m$ drawn from a Beta distribution. The first turn in each discussion begins a segment. For every later turn, a Bernoulli variable governed by the current speaker's $\pi_m$ determines whether the topic distribution changes. A shifted turn draws a new topic mixture from a Dirichlet distribution; otherwise it inherits the preceding turn's mixture. Words are then generated from latent topic assignments as in LDA.

The speaker parameter captures both how often a participant changes the topic and how often that participant instead continues a topic introduced by someone else. It is therefore a relative, corpus-specific measure of agenda-setting propensity rather than a general measure of personal power. The paper estimates SITS with three Gibbs-sampling chains in each application and averages posterior quantities across chains.

## Experiments

The first validation uses 70 ten-minute, two-person political discussions with researcher-prompted topic changes. Classifying turns with posterior shift probability of at least 0.50, SITS identifies 81.40% of the known segment starts when allowing for a shift within two speaking turns of the prompt.

The second validation fits SITS to 20 U.S. general-election presidential debates from 1992 through 2016. In two repeated topic-intrusion trials covering 200 sampled segments, crowd workers select the correct intruding topic in 62% and 68% of tasks. The trial difference is not statistically significant ($p=.25$). A third exercise compares SITS segments with segments derived from hand coding in the 1992, 2004, and 2008 debates. Human similarity judgments yield significantly higher cluster quality for SITS segments.

In the presidential-debate application, the processed corpus contains 3,818 speaking turns and 944 terms. Clarifying candidates generally devote more speech and more topic-shifting turns to the economy than insurgent candidates, consistent with prior hand-coded results, with exceptions in 2004 and 2012.

The in-person deliberation application analyzes ten four-person groups discussing Brigham Young University's Dress and Grooming Standards, totaling 899 turns and 667 terms. Agenda setting is not correlated with a participant's share of comments or speaking time and is negatively correlated with interruption share ($r=-.33$, $p<.05$). In a logistic regression of whether a participant introduced an adopted group proposal, the agenda-setting coefficient is positive and significant (6.00, clustered SE 2.35), whereas the four participation measures are not distinguishable from zero.

The online application contains 91 incentivized, two-person discussions about which charity should receive a donation; 81 pairs reach agreement. The estimated agenda-setting measure has mean .38 and standard deviation .16. Within agreeing pairs, the participant with greater agenda-setting ability is more likely to secure their preferred charity in a paired Wilcoxon test ($p=.02$), with a paired t-test giving a consistent result. Speaking first ($p=.27$) and speaking more ($p=.19$) do not show corresponding associations.

Verification materials are available through [Harvard Dataverse](https://doi.org/10.7910/DVN/MYM5OB), subject to limitations on data access for human-subjects protection.

## Limitations

The speaker parameter does not explain why a topic shift succeeds or how attention is maintained; personality, agreement, and social norms remain possible mechanisms. Because it measures relative behavior among observed participants, it may omit broader power relations, including deference to actors who are not present. Its relationship to perceived power, persuasion, influence, and incivility may vary across settings.

The applications also have limited scope. The deliberation study concerns a specific university policy and only 40 participants. The online study uses digitally experienced MTurk workers, ten discussions fail to reach agreement, and the observed association does not by itself establish a general causal effect of agenda setting. Topic-model estimates depend on preprocessing, topic number, hyperparameters, and researcher interpretation of topics; the paper reports that the debate results may be sensitive to standard stopword removal. Finally, the known-shift validation can verify prompted changes but cannot determine every unprompted topic change within a segment.

## Related Concepts

- [[Interactive Agenda Setting]]
- [[Speaker Identity for Topic Segmentation]]
- [[Party Issue Agendas]]
- Topic modeling
- Topic segmentation
- Text as data

## Related Papers

- Nguyen et al. (2014), "Modeling Topic Control to Detect Influence in Conversations Using Nonparametric Topic Models."
- Nguyen, Boyd-Graber, and Resnik (2012), "SITS: A Hierarchical Nonparametric Model Using Speaker Identity for Topic Segmentation in Multiparty Conversations."
- Boydstun, Glazier, and Pietryka (2013), "Playing to the Crowd: Agenda Control in Presidential Debates."
- Grimmer and King (2011), "General Purpose Computer-Assisted Clustering and Conceptualization."
- Vavreck (2009), *The Message Matters: The Economy and Presidential Campaigns*.

[[index|Library home]]
