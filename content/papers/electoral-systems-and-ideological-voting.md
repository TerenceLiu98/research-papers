---
title: "Electoral systems and ideological voting"
type: paper
authors:
  - Pedro Riera
  - Francisco Cantú
year: 2022
doi: "10.1017/S1755773922000248"
tags:
  - electoral-systems
  - ideological-voting
  - personal-vote
  - ballot-structure
---

## TL;DR

Across 164 elections in 51 democracies, voter-party ideological distance predicts vote choice under every electoral system studied, but it matters more under closed- and flexible-list proportional representation than under more candidate-centred rules. Evidence that larger candidate fields further modify this relationship is much weaker: long open lists are associated with less [[Ideological Voting|ideological voting]], but the candidate-count interaction fails many robustness checks.

## Research Question

Do the intraparty incentives created by ballot structure and the number of district-level candidates change how strongly voters rely on ideological proximity when choosing a party?

## Motivation

Research on electoral systems and vote choice has usually emphasized the interparty dimension: electoral rules shape the number and ideological placement of parties available to voters. This paper instead examines the intraparty dimension. Candidate-centred rules can make politicians' valence, local profile, and other personal attributes more salient, while party-centred rules constrain voters to choose ordered lists and may make party ideology a more informative cue. Connecting these institutional incentives to voter behavior provides a demand-side test of theories about the [[Personal Vote|personal vote]].

## Contributions

- Develops the hypothesis that party ideology should weigh more heavily in vote choice under party-centred than candidate-centred electoral rules.
- Separates ballot structure from the size of the district-level candidate field and tests whether larger fields amplify their different incentives.
- Provides a cross-national individual-level test using the first five waves of the Comparative Study of Electoral Systems (CSES), rather than evidence from a single country or aggregate election outcomes.
- Examines possible mechanisms through nominal voting, intraparty competition, preference voting, and repeated Greek elections held under open and closed lists.
- Shows that the ballot-structure result is robust while the candidate-count result is not, placing a clear ceiling on the second claim.

## Method

The analysis covers 204,404 respondents in 164 legislative elections across 51 countries classified as democracies. The data are stacked at the respondent-party level. The dependent variable equals one for the party a respondent reports having supported and zero for the other major parties for which CSES provides ideological placements. Respondents who abstained or cast invalid or blank ballots are excluded, and at most nine parties per election can be represented.

The main explanatory variable is the absolute distance between a respondent's self-placement and a party's placement on a 0-to-10 left-right scale. A dichotomous ballot-structure measure classifies closed- and flexible-list proportional representation as party-centred and open-list PR, single transferable vote (STV), alternative vote, two-round majority, first-past-the-post, and mixed systems as candidate-centred. The paper also uses the continuous Shugart and Farrell-McAllister indices of candidate-centredness.

The estimated district-level candidate count multiplies the number of party lists by district magnitude and is logged to allow diminishing marginal effects. Testing the second hypothesis requires a triple interaction among ideological distance, ballot structure, and candidate count. The main specifications use alternative-specific conditional logit models with respondent fixed effects and standard errors clustered by election, alongside three-level hierarchical linear models with random intercepts for respondents and elections.

## Experiments

For the main ballot-structure test, the marginal effect of left-right distance falls in magnitude from 0.049 under closed- or flexible-list PR to 0.044 under other rules. The two continuous institutional measures similarly imply declines of 0.01 when moving from closed to open lists and 0.005 when moving from closed lists to STV. At a five-point voter-party distance, the predicted voting-probability difference between party- and candidate-centred systems is about two percentage points. Alternative ideological dimensions produce the same qualitative pattern, with reported distance effects falling from 0.033 or 0.025 under closed lists to 0.016 or 0.018 under open lists or STV.

The candidate-count evidence is asymmetric. In candidate-centred systems, the marginal effect of ideological distance shrinks from about 4% in districts with two candidates to about 1% in districts with more than 2,000 candidates. In party-centred systems, larger candidate fields produce no substantial change, contrary to the prediction that they should strengthen ideological voting. Most alternative specifications and sample restrictions fail to support this second hypothesis, and its party-centred component is especially sensitive to excluding Brazil.

Mechanism tests find less left-right voting both where ballots are nominal and where co-partisans compete, so they cannot distinguish which feature drives the result. Among 14 open-list elections, preference voting becomes more common as candidate counts rise. Comparisons of Greek elections held under open and closed lists also show slightly more ideological voting under closed lists, but the interaction with candidate counts is not statistically significant.

## Limitations

The cross-national estimates are observational, and electoral rules may be endogenous to patterns of political behavior. The Greek comparisons reduce but do not remove this concern because they assume voters surveyed across repeated elections and changing political conditions are comparable.

The main measure reduces ideology to a single left-right dimension. Replications on alternative dimensions support the ballot-structure result, but data coverage is lower, and multidimensional competition correlated with candidate-centred rules could still bias the estimates. Party placements and reported votes are unavailable for minor alternatives beyond the nine parties covered by CSES.

Candidate counts are constructed from list counts and district magnitude rather than observed candidate rosters. Elections without within-country variation in the measure are excluded from the main interaction analysis. Most importantly, the candidate-count hypothesis is not robust across alternative measurements, samples, and controls, so the evidence does not establish that larger fields generally intensify ideological voting under party-centred rules.

## Related Concepts

- [[Ideological Voting]]
- [[Personal Vote]]
- [[Ideological Dimensionality]]
- [[Party-System Polarization]]
- Ballot structure
- Intraparty competition

## Related Papers

- Carey and Shugart (1995), "Incentives to cultivate a personal vote: A rank ordering of electoral formulas."
- Lachat (2011), "Electoral competitiveness and issue voting."
- Farrell and McAllister (2006), "Voter satisfaction and electoral systems: Does preferential voting in candidate-centred systems make a difference?"
- [[Party system polarization and the effective number of parties]]
- [[Beyond the median voter: A model of how the ideological dimension shapes party polarization]]

[[index|Library home]]
