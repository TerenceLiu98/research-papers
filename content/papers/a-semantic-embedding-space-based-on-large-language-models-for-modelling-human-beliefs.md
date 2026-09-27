---
title: "A semantic embedding space based on large language models for modelling human beliefs"
type: paper
authors:
  - Byunghwee Lee
  - Rachith Aiyappa
  - Yong-Yeol Ahn
  - Haewoon Kwak
  - Jisun An
year: 2025
doi: "10.1038/s41562-025-02228-z"
journal: "Nature Human Behaviour"
tags:
  - belief-embeddings
  - representation-learning
  - cognitive-dissonance
  - political-polarization
  - computational-social-science
---

## TL;DR

Fine-tuning Sentence-BERT on co-occurring debate votes produces a 768-dimensional space of [[concepts/belief-embeddings|Belief Embeddings]] that captures associations across issues and separates some political and religious groups. Averaging a user's belief vectors and choosing the nearer stance on a held-out debate achieves accuracy and macro F1 of 0.590. The relative distance between competing stances predicts how often users choose the nearer one, but this observational association does not directly measure psychological discomfort or establish a causal mechanism of belief change.

## Research Question

Can language-model embeddings trained on expressed beliefs capture relationships across diverse issues, represent individuals' belief systems, and predict their positions on unseen debates? How do the geometry of prior beliefs and the distances to competing stances relate to observed choices?

## Motivation

Survey-based belief networks typically cover a limited set of issues and make it difficult to incorporate new statements. Text encoders can represent previously unseen statements, but ordinary semantic similarity need not capture which beliefs people jointly hold. Combining language representations with voting records aims to learn these social associations while retaining the ability to encode new beliefs.

## Contributions

- Constructs a continuous belief space by fine-tuning a sentence encoder on triplets derived from users' co-voting patterns.
- Represents individuals by their mean belief vector and compares the resulting group separation with independently self-reported identities and issue positions.
- Evaluates stance prediction on held-out debates and examines variation by history length, topic, belief dispersion, and distance to candidate beliefs.
- Introduces relative dissonance as a geometric proxy for the difference in alignment between two competing beliefs and a user's existing belief profile.

## Method

**Data and operationalization.** Debate.org records span 15 October 2007 to 19 September 2018. The original corpus contains 78,376 debates with 68,900 unique titles. GPT-4 filters out 8,914 titles judged unsuitable as belief statements, leaving 59,986 unique titles and 40,280 users. Debater positions and voters' PRO/CON responses are treated as expressed beliefs; TIE responses are excluded. Templates turn each position into an agreement or disagreement statement about the debate title. A check of 50 titles by three author-annotators reports Fleiss' kappa of 0.866 and 88% agreement between GPT-4 and the human majority. The supplied text gives conflicting vote totals, noted below.

**Representation learning.** The selected encoder is `roberta-base-nli-stsb-mean-tokens`. Positive examples are sampled from beliefs co-voted with an anchor, weighted by co-occurrence frequency. Negatives are the opposite stance or beliefs co-voted with that opposite stance. Up to five positives and five negatives yield at most 25 triplets per anchor; a pair may occur in both roles with different frequencies. Training uses an average of 1,354,123 triplets per split and Euclidean triplet loss (Methods, equation 3):

$$
L=\max\left(\|\mathbf{s}_a-\mathbf{s}_p\|_2-\|\mathbf{s}_a-\mathbf{s}_n\|_2+5,0\right).
$$

**Users and prediction.** The authors divide debates 80:20 for fivefold evaluation. Downstream evaluation includes users appearing in both training and test data. For training beliefs $\mathbf{b}_i^u$, the user representation is $\mathbf{u}=N_u^{-1}\sum_i\mathbf{b}_i^u$. On a held-out debate, the predicted stance is the nearer of its encoded PRO and CON statements. This tests generalization to unseen debates for users with observed histories, rather than prediction for users without histories.

**Geometric summaries.** Effective radius measures dispersion of the user's training beliefs (equation 1):

$$
r_g^u=\sqrt{\frac{1}{N_u}\sum_i\|\mathbf{b}_i^u-\mathbf{u}\|_2^2}.
$$

For distances $d_{\min}$ and $d_{\max}$ from the user to the nearer and farther candidate stances, relative dissonance is (equation 2)

$$
d^*=\frac{d_{\max}-d_{\min}}{d_{\min}}.
$$

The paper uses "dissonance" broadly for distance in the learned space. Because the prediction rule always selects the nearer stance, its accuracy is also the observed proportion choosing that stance.

## Experiments

**Embedding evaluation.** Fine-tuned S-BERT obtains triplet accuracy of 0.946 (SD 0.001) on training data and 0.674 (0.002) on test data, compared with 0.397 (0.001) and 0.376 (0.003) before tuning. GLUE-STSB Spearman correlation falls from 0.877 to 0.718 (0.005); fine-tuned BERT reaches 0.476 (0.045). Thus learning belief associations improves the triplet task while reducing general semantic-similarity performance (Table 1).

**Held-out stance prediction.** Values are means with standard deviations across fivefold evaluation (Table 2).

| Model | Accuracy | Macro F1 |
| --- | --- | --- |
| S-BERT, fine-tuned | 0.590 (0.006) | 0.590 (0.005) |
| S-BERT, before fine-tuning | 0.565 (0.002) | 0.527 (0.002) |
| BERT, fine-tuned | 0.579 (0.002) | 0.578 (0.001) |
| BERT, before fine-tuning | 0.541 (0.001) | 0.496 (0.001) |
| Random choice | 0.499 (0.002) | 0.499 (0.002) |
| Majority selection | 0.532 (0.001) | 0.347 (0.001) |
| Llama2-13b-chat | 0.537 (0.002) | 0.371 (0.002) |

The Llama 2 prompt supplies prior beliefs and requests a binary stance. Context limits permit testing only approximately 85% of the dataset, limiting direct comparability with the other rows.

**Structure and polarization.** PCA reveals topic-specific bimodality even though the overall belief distribution is unimodal along the first two components. Some issues align along the first component; other topics separate along higher components or have diffuse distributions. Averaged user vectors separate self-reported Democrats from Republicans and Christians from Atheists more clearly after tuning. Across 48 self-reported "big issues," opposing groups' centroid distance correlates with partisan polarization at $r=0.627$, $P<0.001$ (Results; Figures 2-3).

**Predictability and relative dissonance.** Longer histories and smaller effective radii are associated with better prediction. Religion and philosophy are more predictable than sports, games, and humorous topics. Accuracy approaches 0.5 when both candidate beliefs are far from a user's profile. The proportion selecting the nearer belief rises approximately linearly with $d^*$ over the observed range, from about 0.5 near zero to close to 1 around 1.5. Across debate categories, mean $d^*$ correlates with prediction F1 at $r=0.921$ (Figures 4-5).

The authors report no significant overall accuracy differences by political party, religion, or sex, and no significant differences in the relative-dissonance relationship for Democrat/Republican or Christian/Atheist comparisons ($P>0.05$ across tested ranges). These null findings do not establish group equivalence. The main text also reports robustness under alternative splits and category downsampling, with details assigned to supplementary material absent from the supplied Markdown.

## Limitations

- A single, primarily US-oriented debate platform limits population and cultural generalization. Explicit voting, binary stance templates, and GPT-4 title filtering define which beliefs are represented; extraction from ordinary free text is not evaluated.
- Accuracy of 0.590 leaves substantial unexplained variation. Sparse histories, heterogeneous topics, and dispersed beliefs reduce predictability; the substantial training/test triplet gap also limits claims of generalization.
- Distance is a learned association measure. Neither perceived discomfort nor a causal effect of dissonance on adoption is directly measured. Held-out debate prediction does not establish temporal forecasting, and the study does not model evolution of the belief space.
- Pretrained encoders can carry cultural and demographic biases. Fine-tuning also lowers general semantic-similarity performance, so performance on belief associations should not be treated as a universal embedding improvement.
- The supplied source reports **197,306** votes in Results but **192,307** in Methods for the filtered dataset. Both agree on 59,986 unique titles and 40,280 users; the vote-total discrepancy remains unresolved.

Source: [published article](https://doi.org/10.1038/s41562-025-02228-z). The paper provides [Debate.org data](https://esdurmus.github.io/ddo.html) and a [replication repository](https://github.com/ByunghweeLee-IU/Belief-Embedding) containing processed records, code, and fine-tuned models.

## Related Concepts

- [[concepts/belief-embeddings|Belief Embeddings]]
- [[concepts/text-embedding-models|Text Embedding Models]]
- [[concepts/cognitive-dissonance|Cognitive Dissonance]]
- [[concepts/political-polarization|Political Polarization]]
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]

## Related Papers

- Reimers and Gurevych (2019), "Sentence-BERT: Sentence embeddings using Siamese BERT-networks" (source reference 32): the sentence-encoding framework used here.
- Galesic et al. (2021), "Integrating social and cognitive aspects of belief dynamics: towards a unifying framework" (source reference 14): a network-based framework motivating the study of interdependent beliefs.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a complementary Wiki connection concerning validation of latent positions against human judgments; it is not cited by this paper.
- [[papers/who-should-fight-the-spread-of-fake-news|Who Should Fight the Spread of Fake News?]]: a complementary Wiki connection using private-public belief mismatch as a different model-defined measure of dissonance; it is not cited by this paper.

[[index|Library home]]
