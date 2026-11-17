---
title: Analyzing Ballot Order Effects When Voters Rank Candidates
type: paper
authors:
  - Yuki Atsusaka
year: 2024
doi: 10.1017/pan.2024.9
tags:
  - electoral-systems
  - political-methodology
  - survey-design
---

## TL;DR

Randomizing candidate order need not eliminate geometric response patterns on grid-style ranked ballots. Atsusaka distinguishes candidate position effects from pattern ranking, finds little consistent evidence of the former in 2022 election surveys, and provides suggestive survey and actual-ballot evidence of the latter.

## Research Question

How does ballot order affect entire candidate rankings, and how can experiments distinguish candidate position effects from geometric ranking behavior?

## Motivation

First-choice analyses miss effects on lower ranks and candidate inclusion. On a grid ballot, respondents may follow a visual pattern independently of candidate preferences. Randomizing candidate order can distribute exposure across candidates while leaving this behavior present.

## Contributions

- Defines conditional and average position effects for scalar summaries of ranking outcomes.
- Generalizes donkey voting to diagonal, zigzag, and dogleg patterns.
- Proposes randomized-order diagnostics and a district-level rotation comparison for detecting pattern ranking.

## Method

Position effects compare potential rankings when a candidate occupies different displayed positions. Conditional effects hold the ordering of other candidates fixed; average effects aggregate over counterfactual positions and other-candidate orderings. The applications summarize outcomes by candidate rank or an indicator of whether the candidate is ranked. Full order randomization supports identification; regression on position indicators uses two additional assumptions discussed in the unavailable supplement.

For pattern ranking, distinguish candidate identities from recorded ranks relative to displayed rows. Under randomized order and the paper's no-pattern-ranking null, complete recorded permutations are uniform across the J! possibilities regardless of underlying preferences. Pearson's chi-squared test compares observed frequencies with N/J!. Nonuniformity provides potential evidence of pattern ranking, not an estimate of its prevalence.

The natural experiment exploits Alaska's alphabetization and rotation across 40 state house districts. For a target candidate ranking, treated districts display those candidates in that order, making a top-to-bottom response produce the target ranking. Differences from control districts identify donkey-voting contributions only if underlying preferences for that ranking are comparable across treatment status.

## Experiments

Survey experiments ran through Lucid Marketplace from October 10 to November 7, 2022: Oakland mayoral respondents numbered 258 and Alaska respondents 354, with the latter evaluating House and Senate races. Candidate order and forced/optional question order were randomized. Forced questions required all candidates; optional questions allowed up to three in Oakland and four in Alaska.

- **Position effects:** 240 of 264 estimates, about 91%, were statistically insignificant, with almost no consistent pattern among significant estimates. This does not establish zero effects.
- **Pattern ranking:** all four Alaska recorded-ranking distributions rejected uniformity at the 0.05 level. The top-to-bottom pattern was especially frequent. Identical recorded patterns across question types occurred for 31% of House and 37% of Senate respondents, although only 3% and 1.6%, respectively, saw the same candidate order.
- **Actual ballots:** the Senate district comparison suggests about 0.6%–3% of ballots may be attributable to donkey voting. The paper describes this as demonstrative and reports similar supplementary House and gubernatorial findings.

Replication materials: [Harvard Dataverse](https://doi.org/10.7910/DVN/AJXRCV).

## Limitations

Pattern analyses include only respondents or voters ranking all four candidates; incomplete rankings remain an important unresolved case. The chi-squared approach becomes difficult beyond five or six items as permutation counts grow. Actual-ballot causal interpretation depends on district preference comparability. Survey evidence does not identify the fraction of pattern rankers, and the study does not demonstrate that a particular election winner changed. Supplementary assumptions and derivations are not included in the supplied Markdown.

## Related Concepts

- [[concepts/pattern-ranking|Pattern Ranking]]: geometric response behavior that can persist under randomized display order.

## Related Papers

- Atsusaka (2023), “Causal Inference with Ranking Data”: provides the ranking potential-outcomes framework used here.
- Atsusaka and Kim (2024), “Addressing Measurement Errors in Ranking Questions for Social Sciences”: examines measurement consequences and design-based responses.
- [[papers/the-probability-of-casting-a-pivotal-vote-in-an-instant-runoff-voting-election|The Probability of Casting a Pivotal Vote in an Instant Runoff Voting Election]]: complementary analysis of how ranked ballots affect winners through counting rules, rather than how display order shapes responses.
