---
title: Error in the Euclidean Preference Model
type: paper
authors:
  - Luke Thorburn
  - Maria Polukarov
  - Carmine Ventre
year: null
source_job_id: "3d9de1bf-96fa-44dd-b499-80cccb66f007"
tags:
  - preference-modeling
  - social-choice
  - vector-embeddings
  - representation-error
---

## TL;DR

Thorburn, Polukarov, and Ventre derive lower bounds on how often ordinal preference profiles cannot be represented in a low-dimensional [[concepts/euclidean-preferences|Euclidean Preference]] model and on the resulting approximation error. Under uniformly random strict rankings, low dimension relative to the numbers of individuals and alternatives can make non-Euclidean profiles overwhelmingly common. For a new random preference, the reported lower bound can reach 7% of the maximum [[concepts/kendall-tau-distance|Kendall Tau Distance]] in some evaluated settings. These are conservative theoretical bounds under an impartial-culture assumption, not empirical error estimates for learned embeddings.

## Research Question

When a Euclidean spatial model is too low-dimensional to represent every ordinal preference profile, how common are the unrepresentable profiles, and how much ranking error is unavoidable when approximating them?

## Motivation

Recommender systems, word embeddings, spatial voting models, and other representation-learning systems often compare entities by Euclidean distance or cosine similarity. For normalized vectors, cosine similarity induces the same ordering as Euclidean distance. Existing theory established that some profiles cannot be represented when dimension is sufficiently low, but the existence of counterexamples does not show whether failure is typical or whether its approximation cost is substantial.

## Contributions

- Derives a lower bound on the probability that a uniformly sampled profile contains a circulant pathology and is therefore not $d$-Euclidean.
- Gives an upper bound on the number of distinct rankings that one $d$-dimensional Euclidean configuration can represent simultaneously.
- Uses that capacity bound and the geometry of the permutohedron to lower-bound expected Kendall tau error for a new uniformly random ranking.
- Connects the results to proximity-based ranking and SoftMax ordering in embedding systems while delimiting when the argument does and does not apply.

## Method

### Preference Model

A profile contains $I$ individuals, each with a strict ranking over $A$ alternatives. It is $d$-Euclidean if alternatives have locations $x^a\in\mathbb R^d$ and individuals have ideal points $w^i\in\mathbb R^d$ such that

$$
a >_i b \quad\Longleftrightarrow\quad
\lVert x^a-w^i\rVert_2 < \lVert x^b-w^i\rVert_2.
$$

The analysis samples rankings independently and uniformly from all $A!$ strict orders, the social-choice assumption known as impartial culture.

### Circulant Obstruction

A circulant pathology consists of a cyclic ordering of $k$ alternatives and $k$ corresponding subpreferences, each beginning at a different point in the cycle. Prior work shows that any profile containing this pattern is not $d$-Euclidean for $d\leq k-2$. The paper counts only selected constructions on disjoint alternative sets, yielding a lower bound rather than the exact probability of non-Euclidean structure. The bound approaches one in evaluated regimes where $d$ is small relative to both $A$ and $I$.

### Approximation Error

For an optimally fitted Euclidean model, the target is a new ranking drawn uniformly after fitting. Its error is the minimum number of adjacent swaps needed to reach a ranking representable by the fitted model, equivalently the Kendall tau distance. The authors first upper-bound the maximum number $r_{A,d}$ of rankings simultaneously representable in one configuration. They then view rankings as vertices of a permutohedron, whose edges are adjacent swaps, and distribute an overestimate $\hat r$ of the representable rankings uniformly to obtain a conservative lower bound on expected distance to the nearest one.

The error theorem assumes the fitted profile contains at least $r_{A,d}$ unique rankings. This condition makes the representable capacity, rather than the particular observed profile, govern the bound.

## Experiments

The paper numerically evaluates its analytic bounds; it does not fit models to an empirical dataset.

- The probability bound indicates that almost all profiles can be non-$d$-Euclidean when $d\ll\min\{I,A\}$, with the bound increasing toward one as $I$ grows for fixed evaluated $d$ and $A$.
- The capacity calculations show that the upper bound on the simultaneously representable fraction of all $A!$ rankings is small in many evaluated settings and rises as $d$ approaches $A$.
- The expected-error calculations report cases where the lower bound reaches at least 7% of the maximum $\binom{A}{2}$ pairwise disagreements. The scaled bound appears less severe for larger $A$ in the displayed calculations.

These numerical results illustrate the proven expressions; they are not measurements of error in recommender, language, or voting data.

## Limitations

- Rankings and profiles are sampled from an impartial culture. Real preferences are structured and nonuniform, so the prevalence and magnitude of error may differ substantially.
- The bounds use one sufficient obstruction, the circulant pathology. They are not tight and do not characterize every non-Euclidean profile.
- The expected-error result requires at least $r_{A,d}$ unique observed preferences. Below that threshold, the approximation error can be zero for some profiles without further assumptions.
- Evaluating the bounds becomes computationally difficult when both $I$ and $A$ exceed roughly $10^3$, according to the paper.
- The analysis applies directly when rankings are recovered by Euclidean distance, normalized-vector cosine similarity, or an equivalent projection ordering. It does not establish the behavior of a neural network that consumes embeddings and may learn nonlinear corrections.
- The supplied source gives proof sketches and refers to an extended preprint for full proofs. It does not provide a publication year or stable identifier, so those metadata are not inferred here.

## Related Concepts

- [[concepts/euclidean-preferences|Euclidean Preferences]]: the spatial representation whose ordinal expressiveness is bounded.
- [[concepts/kendall-tau-distance|Kendall Tau Distance]]: the adjacent-swap error measure used in the approximation theorem.
- [[concepts/text-embedding-models|Text Embedding Models]]: one application area where proximity-based ranking can impose Euclidean ordinal structure.
- [[concepts/euclidean-latent-space-item-response-models|Euclidean Latent Space Item Response Models]]: a related proximity model for respondents and items.
- [[concepts/circular-voting-models|Circular Voting Models]]: an alternative geometry for spatial preference representation.

## Related Papers

- Bogomolnaia and Laslier (2007), "Euclidean preferences": establishes dimensional sufficiency results and the circulant obstruction used here.
- Peters (2017), "Recognising multidimensional Euclidean preferences": proves recognition hardness and representation-size results that motivate the use of indirect bounds.
- [[papers/l1-based-bayesian-ideal-point-model-for-multidimensional-politics|L1-based Bayesian Ideal Point Model for Multidimensional Politics]]: replaces Euclidean distance with Manhattan distance to change the geometry and identification of multidimensional spatial voting.
- [[papers/spatial-voting-models-in-circular-spaces-a-case-study-of-the-us-house-of-representatives|Spatial voting models in circular spaces: A case study of the U.S. House of Representatives]]: evaluates a circular alternative to conventional Euclidean spatial voting.

[[index|Library home]]
