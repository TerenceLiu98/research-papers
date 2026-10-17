---
title: "Tea Party in the House: A Hierarchical Ideal Point Topic Model and Its Application to Republican Legislators in the 112th Congress"
type: paper
authors:
  - Viet-An Nguyen
  - Jordan Boyd-Graber
  - Philip Resnik
  - Kristina Miler
year: null
source_job_id: "c6c8e8c1-042d-49ed-8c7d-885b6a920498"
tags:
  - ideal-point-estimation
  - topic-models
  - legislative-behavior
  - political-framing
---

## TL;DR

The Hierarchical Ideal Point Topic Model (HIPTM) jointly models roll-call votes, bill text, and legislators' speeches to estimate issue-specific positions and the frames associated with them. Applied to Republicans in the 112th U.S. House, its features improve Tea Party Caucus membership prediction when combined with votes and outperform lexical baselines when only test legislators' text is available. The analysis distinguishes disagreement in voting positions from disagreement in rhetoric, including different health-care frames among legislators who share opposition to the Affordable Care Act.

## Research Question

Can a joint model of legislative behavior and language recover interpretable policy positions, distinguish intra-party framing differences, and predict caucus membership for legislators whose votes are unavailable?

## Motivation

One-dimensional ideal points can hide issue-specific differences, while unrestricted multidimensional models are difficult to interpret. Bill topics supply policy labels but do not capture how legislators discuss those policies. HIPTM introduces [[concepts/frame-specific-ideal-points|Frame-Specific Ideal Points]] within [[concepts/hierarchical-topic-models|Hierarchical Topic Models]] to connect speech framing to latent positions and votes.

## Contributions

- Combines three sources of evidence: votes, bill text, and legislators' own language, without requiring speeches to be aligned to individual bills.
- Uses policy-labeled bills to inform issue-topic priors and learns an unbounded set of subordinate frames for each fixed issue.
- Predicts positions from language after training with votes and text, enabling caucus classification without test-legislator votes.
- Proposes a two-axis description of intra-party conflict based on polarization of issue positions and issue frames.

## Method

### Issues, Frames, and Votes

First-level topics represent policy issues, with informed Dirichlet priors derived from the Congressional Bills Project and Policy Agendas topic labels. Each issue has frame topics drawn around its word distribution. A hierarchical Dirichlet process allows the number of frames under an issue to grow. Speech tokens select an issue, then a frame, then a word; bill tokens follow an LDA-style mixture over the issue topics.

For legislator $a$ and issue $k$, the latent position has a Gaussian distribution centered on the legislator's frame-weighted regression score:

$$
u_{a,k}\sim\mathcal N\!\left(\sum_j\hat\psi_{a,k,j}\eta_{k,j},\rho\right).
$$

Here $\hat\psi_{a,k,j}$ is the fraction of the legislator's tokens on issue $k$ assigned to frame $j$, and $\eta_{k,j}$ is that frame's regression weight. When the legislator never discusses the issue, the mean falls back to zero. Bill issue proportions $\hat\vartheta_{b,k}$ determine which positions matter for a vote:

$$
\Pr(v_{a,b}=1)=\operatorname{logistic}\!\left(x_b\sum_k\hat\vartheta_{b,k}u_{a,k}+y_b\right),
$$

where $x_b$ and $y_b$ are bill polarity and popularity. In this application, $v_{a,b}=1$ means agreement with Freedom Works' recommended position, rather than necessarily a yea vote. The model therefore targets alignment on selected Tea Party-relevant votes.

### Inference and Prediction

Stochastic EM alternates sampling token assignments, issue topics, and frame proportions with L-BFGS updates for frame weights and gradient ascent for legislator and bill parameters. Section 6 runs 1,000 iterations, discards the first 500, and averages features over ten retained states spaced fifty iterations apart.

For classification with votes and text available, the SVM feature vector concatenates issue positions, text-derived position means, and predicted vote probabilities. In the text-only test setting, the model learns from training legislators' votes and text, then infers issue/frame assignments for unseen legislators from their speeches. Their features contain text-derived positions and predicted vote probabilities.

## Experiments

### Data and Evaluation

The dataset contains 240 Republican representatives, including 60 self-identified Tea Party Caucus members, and 13,856 observed votes on 60 Freedom Works key votes: 40 from 2011 and 20 from 2012. Bill text and labels come from the Congressional Bills Project; speeches come from GovTrack. The processed vocabulary contains 5,349 word types.

Caucus membership classification uses SVMlight, stratified five-fold cross-validation, and AUC-ROC. In the votes-and-text experiment, HIPTM features are estimated from all legislators' observed votes and language before classifier evaluation. The text-only experiment instead fits HIPTM on the training data and withholds test legislators' votes.

| Setting | Reported comparison in Section 6 |
| --- | --- |
| Votes and text available | Vote features outperform lexical features. HIPTM alone is only slightly better than votes; combining HIPTM and votes significantly outperforms votes alone, according to the authors. |
| Adding lexical features to votes | TF or TF-IDF yields little improvement over votes alone. |
| Test legislators represented only by text | HIPTM outperforms both lexical baselines, but performance drops substantially relative to the vote-based approach. |

Exact AUC values are not transcribed in the supplied Markdown, so numerical margins are not reconstructed from Figures 2-3.

### Political Interpretation

The separate one-dimensional baseline correlates with DW-NOMINATE at $\rho=0.91$ and places the median Tea Party Caucus member above the median non-member. Exceptions illustrate why organizational membership and voting alignment differ: Jeff Flake is highly aligned with Freedom Works despite not belonging to the caucus, whereas some caucus members agree with Freedom Works only about half the time.

HIPTM's issue-level comparisons identify Government Operations, Macroeconomics, and Transportation as especially divided; most other issue distributions substantially overlap. For the vote to eliminate the Energy Efficiency and Renewable Energy Program, 41 of 53 Tea Party members vote in agreement with Freedom Works, compared with 43% of non-members (Section 7.2).

The framing analysis contrasts criticism of government overspending with concern about government shutdowns. In health care, establishment-oriented frames emphasize exchanges and implementation costs, while Tea Party-oriented framing emphasizes an unconstitutional government takeover, despite shared votes to repeal the Affordable Care Act (Section 8).

Table 2 organizes issues by two distinct forms of polarization:

| Issue positions | Issue frames | Examples reported by the paper |
| --- | --- | --- |
| Not polarized | Not polarized | Civil Rights, Minority Issues, Civil Liberties |
| Polarized | Not polarized | Banking and Finance; Transportation |
| Not polarized | Polarized | Health; Public Lands and Water Management |
| Polarized | Polarized | Macroeconomics; Government Operations |

Implications for cooperation and gridlock are proposed interpretations of these categories, not evaluated forecasts of legislative passage.

## Limitations

- Learned subtopics are not necessarily rhetorical frames. The authors' Boeing/NLRB example is concentrated among South Carolina legislators and can reflect geography and a local dispute rather than a general framing distinction.
- Freedom Works' selected votes operationalize a particular form of political alignment. Caucus membership is a separate organizational label, so classification success does not establish a comprehensive measure of Tea Party ideology.
- The evidence covers Republicans in one Congress. Applying the model to candidates, media outlets, or other genres is suggested future work, not demonstrated transfer.
- The votes-and-text classifier uses representations estimated with all legislators' votes and text; it addresses a different information setting from the unseen-legislator text-only experiment. Neither experiment establishes future-congress forecasting performance.
- The source contains corrupted equations, omitted footnote bodies, and a contradictory description of the second Transportation vote as both broadly popular and opposed by majorities. These details are not reconstructed. Publication year, venue, and stable identifiers are absent, so the year remains null.

## Related Concepts

- [[concepts/frame-specific-ideal-points|Frame-Specific Ideal Points]]: uses speech-frame mixtures to connect rhetoric with issue positions.
- [[concepts/hierarchical-topic-models|Hierarchical Topic Models]]: provides the issue/frame hierarchy.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: attaches issue-specific departures to an overall position using bill content.
- [[concepts/topic-factorized-ideal-points|Topic-Factorized Ideal Points]]: jointly learns bill topics and topic-dependent voting parameters.

## Related Papers

- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: cited as Gerrish and Blei (2012), a predecessor connecting issue content to multidimensional legislative behavior.
- [[papers/topic-factorized-ideal-point-estimation-model-for-legislative-voting-network|Topic-Factorized Ideal Point Estimation Model for Legislative Voting Network]]: cited as Gu et al. (2014), a joint text/vote model; HIPTM additionally models legislators' own speech and subordinate frames.
- Nguyen, Boyd-Graber, and Resnik (2013), "Lexical and hierarchical topic regression": cited foundation for treating second-level topics as issue frames.
- Lauderdale and Clark (2014), "Scaling politically meaningful dimensions using texts and votes": cited foundation for topic-weighted issue positions in the voting model.

[[index|Library home]]
