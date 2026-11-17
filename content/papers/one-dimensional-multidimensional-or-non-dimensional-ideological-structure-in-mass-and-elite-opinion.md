---
title: "One-dimensional, multidimensional, or non-dimensional? Ideological structure in mass and elite opinion"
type: paper
authors:
  - Philippe Mongrain
  - Stefaan Walgrave
year: null
doi: 10.1017/S1475676526100838
source_job_id: 539396bd-a1bd-4b01-a4fc-443f6de09eb8
tags:
  - public-opinion
  - political-ideology
  - voting-advice-applications
---

## TL;DR

Across twelve Belgian voting advice applications from the 2024 elections, citizens’ concrete policy preferences show much weaker ideological constraint than party leaders’ answers to identical statements. Multiple statistical factors emerge, but they explain little variance and rarely form coherent policy dimensions. Immigration is the clearest exception. The authors describe this pattern as “non-dimensional,” meaning weak substantive organization rather than literally zero statistical factors.

## Research Question

Are citizens’ policy preferences organized along one ideological axis, several coherent axes, or largely disconnected positions, and how does their organization compare with political elites?

## Motivation

Findings about ideological structure depend on whether researchers measure abstract values or concrete policies, which issues they select, and the benchmark for meaningful constraint. Identical questions for citizens and leaders help establish whether an issue agenda supports ideological organization at all, while twelve applications test robustness across agendas and audiences outside the United States.

## Contributions

- Compares mass and elite responses to the same concrete policy statements.
- Examines twelve language-, audience-, and election-specific applications rather than one item battery.
- Combines correlations, exploratory and confirmatory factor analysis, and multidimensional item response models to distinguish extracted factors from substantively coherent dimensions.
- Reports a parallel Irish application analysis and examines whether personally salient issues exhibit stronger constraint.

## Method

Belgium’s Vote Test ran from April 15 to June 9, 2024. Table 1 reports 6,365,696 complete sessions after excluding sessions of 70 seconds or less; these are sessions, not verified unique people. Each application contains 25–35 statements, and the text reports 348 unique statements overall. All thirteen party leaders answered the same policy battery in February–March: seven Dutch-speaking and six French-speaking leaders.

Analyses are separate for each application. Further cleaning removes completion-time outliers using the 1.5-IQR rule and imposes minimum durations of 2.5 minutes for 35 items and 2 minutes for 25 items. Skipped answers are handled with pairwise deletion. Absolute tetrachoric correlations measure cross-item association. Exploratory factor analysis uses oblimin rotation; eigenvalues, parallel analysis, MAP, and VSS inform retention. Parallel analysis supplies the main factor counts. Two-parameter logistic multidimensional IRT models use random samples of up to 10,000 sessions per application.

Confirmatory models test economic and cultural dimensions after excluding items without clear left–right relevance. Salience weights sum item weights of two for boosted items and one otherwise, then normalize respondent totals to mean one. This is person-level weighting, distinct from restricting correlations to pairs of personally boosted issues.

## Experiments

The evidence is observational, not a randomized experiment. Table 2 reports:

| General application | Citizen mean absolute correlation | Leader mean absolute correlation | Citizen pairs ≥ 0.4 | Leader pairs ≥ 0.4 | Correlation of correlation matrices |
| --- | --- | --- | --- | --- | --- |
| Dutch-speaking | 0.15 | 0.34 | 4.24% | 35.59% | 0.50 |
| French-speaking | 0.16 | 0.42 | 4.04% | 47.93% | 0.64 |

Across all twelve applications, citizen mean correlations range from 0.13 to 0.20, compared with 0.31–0.42 among leaders. Immigration has the strongest clustering in nine applications. Restricting comparisons to pairs of boosted issues raises correlations toward elite levels; nevertheless, salience-weighted latent-variable models do not reveal strong general constraint. Boosting was infrequent.

Factor-retention methods suggest two to eight factors. Parallel analysis selects four for both general applications. Their four-factor EFA solutions explain approximately 32% of variance; the first factor explains 14% in the Dutch-speaking application and less than 15% in the French-speaking application. Across applications, cumulative explained variance remains below 40%. Later factors often mix unrelated policy areas. The hypothesized economic–cultural CFA structure fits poorly across applications, and IRT yields similar substantive conclusions.

The paper reports similar patterns in Ireland’s 2024 VoteSmart data, covering 35 issues and 34 party leaders and independent candidates. Detailed replication results are assigned to the appendix, which is not included in the supplied Markdown.

## Limitations

VAA participation is self-selected; missing demographics, political knowledge, and interest measures prevent subgroup assessment or population adjustment. Repeat participation cannot be identified reliably without personal identifiers. The elite benchmark contains only thirteen leaders and may reflect party positioning rather than a representative sample of elected officials. Concrete policy batteries do not directly test coherence of abstract values, temporal stability, or individual psychological mechanisms. Weak constraint also does not establish an absence of affective polarization.

Multiple factors and better multidimensional fit do not by themselves establish strong substantive constraint. Conversely, “non-dimensional” is the authors’ interpretation of weak and fragmented structure, not proof that every citizen lacks organized beliefs. The Irish replication broadens the comparison but does not identify electoral institutions as a cause.

Source notes: publication year is not explicitly stated in the supplied text, so it is left unset; acceptance is dated November 12, 2025. The DOI above restores the separator in the printed supplementary-material link. Figure 1’s extracted annotation gives 2,776,206 sessions and an elite mean of 0.3, whereas nearby prose uses larger session counts and Table 2 gives 0.34. The summary uses Table 2 for correlations and does not equate Table 1 totals with final analysis counts. Replication materials: https://doi.org/10.7910/DVN/8WKWUR.

## Related Concepts

- [[concepts/ideological-constraint|Ideological Constraint]]: strength of associations across policy positions.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: number and substantive interpretation of shared policy axes.
- [[concepts/issue-publics|Issue Publics]]: selective issue engagement provides context for the stronger boosted-item correlations, without establishing issue-public membership here.

## Related Papers

- [[papers/the-nature-of-belief-systems-in-mass-publics|The Nature of Belief Systems in Mass Publics]]: foundational account of weak mass constraint and elite–mass differences; this study adds identical policy questions across groups.
- [[papers/the-structure-of-political-choices-distinguishing-between-constraint-and-multidimensionality|The Structure of Political Choices: Distinguishing Between Constraint and Multidimensionality]]: separates predictive strength from dimension count using held-out choices; its predictive criterion differs from this paper’s factor interpretation and variance-explanation approach.
