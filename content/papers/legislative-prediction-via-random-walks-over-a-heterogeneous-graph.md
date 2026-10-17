---
title: Legislative Prediction via Random Walks over a Heterogeneous Graph
type: paper
authors:
  - Jun Wang
  - Kush R. Varshney
  - Aleksandra Mojsilovic
year: null
source_job_id: "33bcde95-1a48-4478-a2c9-fb392c655ecd"
tags:
  - roll-call-voting
  - heterogeneous-graphs
  - link-prediction
  - random-walks
---

## TL;DR

RWHG predicts legislative votes by propagating observed yea and nay links through a legislator cosponsorship graph and a bill text-similarity graph. On the 110th and 111th U.S. Congresses, it reports 91.10% accuracy for randomly missing votes and 90.36% for chronological prediction, exceeding the compared baselines. Bill similarity alone is a stronger predictor than the tested cosponsorship-only nearest-neighbor method; the combined graph model performs best.

## Research Question

Can political relationships between legislators and textual similarity between bills jointly predict both missing votes on observed bills and votes on future bills?

## Motivation

Cosponsorship supplies information about collaboration, while bill text connects legislative decisions across issues and time. The paper combines these two sources through [[concepts/heterogeneous-graph-vote-propagation|Heterogeneous Graph Vote Propagation]], avoiding a requirement to represent every actor and bill on a single ideological axis. Its two working assumptions are that politically similar legislators tend to vote alike and that semantically similar bills tend to receive similar votes.

## Contributions

- Represents roll calls using two vertex types, legislators and bills, with cosponsorship, semantic-similarity, and directed vote edges.
- Separates yea and nay votes into nonnegative graphs suitable for random-walk computations.
- Combines within-type relevance estimation with cross-type vote propagation and greedy insertion of predicted links.
- Evaluates random missing-vote recovery and chronological prediction, and compares the predictive information in bill similarity and cosponsorship.

## Method

### Graph Construction

Legislator similarity is $w_{lm}=c_{lm}/(C_l+C_m)$, where $c_{lm}$ counts jointly cosponsored bills and $C_l,C_m$ are individual cosponsorship counts. Bill similarity is cosine similarity between 4,743-dimensional bag-of-ngrams vectors. The vocabulary contains one- through five-grams appearing in more than 0.2% and fewer than 15% of bills. Both similarity graphs use six-nearest-neighbor sparsification (Sections 2 and 4.1).

Observed yea and nay votes form separate binary legislator-to-bill adjacency matrices. An absent link is zero in both. Row normalization produces a transition matrix for each vote class, so negative votes never become negative transition weights.

### Two-Stage Propagation

First, random walks with restart independently produce legislator relevance $R_x$ and bill relevance $R_y$. For example,

$$
R_x=(1-\alpha)(I-\alpha P_x)^{-1}F_x,
$$

where $P_x=D_x^{-1}W_x$ and $F_x$ is diagonal with normalized vertex degrees. The bill graph has an analogous expression with parameter $\beta$. These are degree-weighted relevance scores, rather than directly estimated causal influence effects.

Second, for each class $c\in\{\mathrm{yea},\mathrm{nay}\}$, vote transitions are updated by

$$
P^c(t+1)=\gamma R_xP^c(t)+(1-\gamma)P^c(t)R_y.
$$

The first path transfers evidence from similar legislators; the second transfers evidence from similar bills. The experiments set $\gamma=6/7$.

The two class scores for each missing vote are normalized to sum to one. The algorithm selects a missing link using the paper's approximate mutual-information criterion, which also incorporates legislator and bill yea/nay priors (Equation 3.21). It assigns the higher-scoring class, inserts that predicted edge, recomputes transitions, and repeats until all missing votes are filled. This is greedy completion, not a proved stationary solution of the full changing graph (Section 3.3).

## Experiments

### Data and Protocol

Section 4.1 reports 631 unique legislators and 638,955 valid yea/nay votes from the 110th and 111th Congresses (2007-2010). Cosponsorship information is restricted to data through the 109th Congress, ending in December 2006.

| Session | Bills in Table 1 | Legislators | Yea votes | Nay votes |
| --- | --- | --- | --- | --- |
| 110th | 745 | 549 | 248,077 | 48,543 |
| 111th | 845 | 553 | 298,106 | 44,229 |

The source prose reports 1,585 bills, whereas Table 1 sums to 1,590. The discrepancy is unresolved in the supplied Markdown; the vote counts do sum to 638,955.

Random missing-vote prediction uses six-fold cross-validation within each session. Chronological prediction uses votes from the first 21 months to predict the final three months. Reported accuracy averages the two sessions (Section 4.4).

### Results

Table 3 reports accuracy in percent. Regression rows retain the source's labels because its descriptions of LARS, L2, ridge, and lasso are inconsistent.

| Method | Random missing votes | Chronological prediction |
| --- | --- | --- |
| Always yea | 85.48 | 86.98 |
| LARS | 82.2 | Not reported |
| L2 | 89.7 | 88.1 |
| Ideal Point Topic Model | 88.7 | 87.0 |
| NN Legislator | 85.42 | Not reported |
| NN Bill | 89.06 | 88.35 |
| RWHG | 91.10 | 90.36 |

RWHG exceeds the strongest reported alternative by 1.40 percentage points for random missing votes and 2.01 points for chronological prediction. Its gains over always predicting yea are 5.62 and 3.38 points, respectively. NN Bill outperforms NN Legislator on random missing votes, consistent with the paper's descriptive similarity analysis. This comparison supports the usefulness of bill text in this dataset; it is not a causal decomposition of the combined model's gains.

The paper also ranks legislators using diagonal relevance scores and discusses selected high-affinity pairs. These are qualitative interpretations of graph scores, without an independent influence benchmark.

## Limitations

- Evidence covers two congressional sessions and binary yea/nay outcomes. Longer temporal modeling and applications outside legislative prediction are proposed future work.
- A high always-yea baseline makes class imbalance consequential. The reported table provides accuracy without class-specific performance, uncertainty intervals, or calibration checks.
- Bag-of-ngrams similarity omits word order beyond the retained ngrams and richer semantic structure. The authors suggest topic models and additional legislator features as extensions.
- Greedily inserted predictions affect later predictions, creating a route for error propagation. The paper does not establish an optimality guarantee for its heterogeneous-graph completion procedure.
- Reproduction details remain incomplete in the supplied text: numerical restart parameters, handling of zero-degree rows or undefined vote priors, and the timing of text-vocabulary construction in chronological evaluation are not specified. Equation 3.20 is also malformed as a standard mutual-information definition; Equation 3.21 supplies the operational approximation.
- The bill-count discrepancy above and the ambiguous regression labels are preserved rather than silently resolved. No publication year, venue, DOI, or other stable identifier for this paper appears in the supplied Markdown, so the year remains null.

## Related Concepts

- [[concepts/heterogeneous-graph-vote-propagation|Heterogeneous Graph Vote Propagation]]: combines actor-side and item-side similarity with observed binary links.
- [[concepts/topic-factorized-ideal-points|Topic-Factorized Ideal Points]]: an alternative text-and-vote model that learns topic-specific latent voting parameters.
- [[concepts/llm-based-roll-call-vote-prediction|LLM-Based Roll-Call Vote Prediction]]: predicts votes through contextual profiles and generated reasoning rather than graph propagation.

## Related Papers

- Gerrish and Blei (2011), "Predicting legislative roll calls from text": cited source of the vote/text dataset and ideal point topic-model comparison.
- Fowler (2006), "Connecting the Congress: A study of cosponsorship networks" and "Legislative cosponsorship networks in the US House and Senate": cited foundations and curated data for the legislator graph.
- Wang et al. (2011), "Joint analysis of time-evolving binary matrices and associated documents": cited temporal modeling alternative.
- [[papers/topic-factorized-ideal-point-estimation-model-for-legislative-voting-network|Topic-Factorized Ideal Point Estimation Model for Legislative Voting Network]]: related library reading on joint bill-text and vote modeling; not a citation in this paper.
- [[papers/political-actor-agent-simulating-legislative-system-for-roll-call-votes-prediction-with-large-language-models|Political Actor Agent: Simulating Legislative System for Roll Call Votes Prediction with Large Language Models]]: related library reading using LLM profiles and sequential predicted votes. Its different dataset and evaluation do not permit a direct accuracy comparison.

[[index|Library home]]
