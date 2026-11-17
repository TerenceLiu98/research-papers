---
title: "Exploring the Political Agenda of the European Parliament Using a Dynamic Topic Modeling Approach"
type: paper
authors:
  - Derek Greene
  - James P. Cross
year: 2017
doi: 10.1017/pan.2016.7
tags:
  - topic-modeling
  - political-communication
  - legislative-behavior
---

## TL;DR

Two layers of non-negative matrix factorization (NMF) recover changing themes from 210,247 English-language European Parliament speeches across 1999–2014. Quarterly topics are grouped into 57 corpus-wide dynamic topics. NMF produces more coherent word lists than the tested LDA baseline, while event timing and committee-related speech patterns provide substantive validation.

## Research Question

How can a parliament’s evolving agenda be recovered from speeches while retaining short-lived, specialized topics, and how does participation in that agenda relate to institutional roles and voting behavior?

## Motivation

Whole-corpus models can obscure brief discussions, and broad topic descriptors can conceal the specialized vocabulary of EU policymaking. Temporally comparable topics make it possible to study both routine policy attention and sharp responses to crises or treaty events. Speech content measures communicated attention, closely related to [[concepts/expressed-agendas|Expressed Agendas]].

## Contributions

- Proposes a two-layer NMF procedure that first discovers local topics and then connects them across time.
- Uses embedding-based topic coherence to select topic counts independently within windows and across the corpus.
- Applies the method to three parliamentary terms, combining coherence comparisons, event-based validation, and models of MEP participation.

## Method

The corpus covers 1,735 MEPs and 60 nonoverlapping quarters from 1999-Q3 to 2014-Q2. Preprocessing lemmatizes unigrams, removes short and rare tokens, stop words and politician names, then applies TF–IDF and document-length normalization.

For each quarter, NMF approximates the nonnegative document–term matrix as $A \approx WH$. Rows of $H$ describe topics; $W$ supplies speech memberships. NNDSVD initializes the factors. Candidate topic counts from 10 to 25 are evaluated using mean TC-W2V coherence: the average pairwise cosine similarity of the embeddings of each topic’s ten leading terms. Word2vec is trained on the complete speech corpus.

The first layer yields 1,017 window topics. Keeping each topic’s 20 highest-weight terms produces a 1,017-by-2,710 topic–term matrix $B$. A second NMF, $B \approx UV$, groups these topic documents into dynamic topics. Each window topic is assigned to its largest-weight dynamic topic. Its local vocabulary records temporal evolution, and the number of quarters containing assigned window topics records temporal frequency. Searching 25–90 dynamic topics selects 57 by coherence, with nearby alternatives producing broadly similar splits and merges (Sections 3 and 6.1).

For 2009–2014, the authors model MEP-topic participation using both summed topic weights in a Gaussian GLM with log link and single-topic speech counts in a negative-binomial regression. Standard errors are clustered by MEP; controls include country, party group, topic, overall speech volume, and English-language coverage.

## Experiments

| Evidence | Reported result |
| --- | --- |
| Quarterly NMF versus LDA | Across 300 model comparisons, NMF has higher TC-W2V coherence in 94.7%; its C-v coherence is higher across all tested windows and topic counts. |
| Topic-count variation | Correlation between selected quarterly topic count and speech volume is 0.006. |
| External events | Financial and euro crises, treaty changes, and fisheries reform correspond to interpretable changes in attention. |
| Institutional roles | In the count model, committee chair, rapporteur, and membership indicators have exponentiated coefficients of 1.169, 2.283, and 2.126 respectively. |
| Party-group defection | Voting with the national party against the European party group is associated with an exponentiated count-model coefficient of 0.86. |

The source calls the exponentiated negative-binomial coefficients odds ratios; they are more appropriately interpreted as multiplicative expected-count ratios under the model. EP leadership is associated with participation in the weighted model but is not significant in the count model. These checks address different aspects of [[concepts/topic-model-evaluation|Topic Model Evaluation]]; coherence comparisons concern window models, rather than a direct benchmark against another dynamic model.

## Limitations

English speeches constitute 77.95% of the collected 269,696 speeches, with unequal national coverage; only 2.6% of Croatian speeches were available in English. The analysis therefore does not represent every speech equally. Quarterly aggregation, preprocessing, topic-count ranges, and hard maximum-weight assignments shape the recovered agenda.

Coherence measures semantic relatedness of word lists, not causal validity or classification accuracy. Event alignments and observational regressions support interpretation without identifying causal effects of shocks, committee positions, or party loyalty. The proposed extension from political attention to policy influence remains untested. Nearby coherence peaks also show that 57 is a selected resolution rather than a uniquely established topic inventory.

## Related Concepts

- [[concepts/expressed-agendas|Expressed Agendas]]: communicated issue priorities, here traced through parliamentary speeches over time.
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]: complementary automatic coherence and substantive validation.

## Related Papers

- [[papers/a-bayesian-hierarchical-topic-model-for-political-texts-measuring-expressed-agendas-in-senate-press-releases|A Bayesian Hierarchical Topic Model for Political Texts: Measuring Expressed Agendas in Senate Press Releases]]: models author-level attention in press releases; this paper instead connects locally fitted speech topics across time.
- Blei and Lafferty (2006), “Dynamic Topic Models”: cited probabilistic approach to evolving topics, contrasted methodologically with two-layer NMF.

Published in *Political Analysis* 25:77–94. Replication data cited by the paper: DOI 10.7910/DVN/LVHLZK.
