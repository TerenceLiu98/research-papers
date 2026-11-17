---
title: "SMOTE: Synthetic Minority Over-sampling Technique"
type: paper
authors:
  - Nitesh V. Chawla
  - Kevin W. Bowyer
  - Lawrence O. Hall
  - W. Philip Kegelmeyer
year: null
tags:
  - imbalanced-classification
  - synthetic-data
---

## TL;DR

SMOTE generates synthetic minority examples between nearby minority observations. Combined with random majority undersampling, it improves many ROC comparisons against undersampling alone, replication, and cost-sensitive baselines, but gains depend on the dataset and learner.

## Research Question

Can synthetic minority examples improve minority-class recognition beyond duplicating observations or changing class costs and priors?

## Motivation

Overall accuracy can conceal failure on rare classes. Replicating minority observations can encourage decision trees to form increasingly specific regions; synthetic examples aim to support broader minority decision regions.

## Contributions

- Introduces [[concepts/synthetic-minority-oversampling|Synthetic Minority Oversampling]] as a feature-space resampling method.
- Evaluates its combination with majority undersampling using ROC curves, AUC, and ROC convex hulls.
- Investigates mixed nominal–continuous features through SMOTE-NC and proposes a nominal-only extension, SMOTE-N.

## Method

For each minority observation, find its five nearest minority neighbors and randomly select neighbors according to the requested oversampling rate. Section 4.2 describes generating points along the segments joining the observation and its neighbors. Thus 200% oversampling adds two synthetic examples per original observation. The printed pseudocode draws a random gap inside the attribute loop, whereas the prose and worked example describe segment interpolation; these descriptions are not strictly identical.

Random majority undersampling then changes the training balance. Separate ROC curves correspond to different synthetic oversampling rates; successive points vary undersampling. The paper's undersampling percentage expresses a minority-to-retained-majority ratio, rather than the percentage deleted.

## Experiments

Nine datasets span Pima, Phoneme, Adult, E-state, Satimage, Forest Cover, Oil, Mammography, and Can. The evaluation averages true- and false-positive rates across ten cross-validation folds. C4.5 and Ripper are compared with their undersampling-only versions; additional baselines vary Ripper loss ratios and Naive Bayes priors. AUC uses trapezoidal integration with an added endpoint at 100% true and false positives.

Reported findings include:

- SMOTE improves many ROC comparisons, although intersecting curves often support a claim about additional convex-hull operating points rather than uniform dominance.
- Naive Bayes outperforms SMOTE-C4.5 on Pima; undersampled Ripper outperforms SMOTE-Ripper on Oil. Can curves largely overlap.
- On Phoneme, the SMOTE–undersampling curve dominates the tested C4.5 leaf-threshold adjustments.
- On Adult, SMOTE-NC performs worse than plain undersampling by AUC. Continuous-only SMOTE also fails to improve performance.
- Oil experiments show no clear improvement over one-sided selection. SHRINK is not directly comparable because it sees different data points.

Table 3 contains C4.5 AUC comparisons, but decimal separators are absent from the supplied extraction; exact normalized AUC values are therefore not transcribed here.

## Limitations

Interpolation can place synthetic observations in majority-class regions. The authors propose this explanation for Adult's deterioration, especially beyond 50% oversampling. Neighbor count and sampling intensity remain design choices; adaptive selection is future work. Experiments focus on binary problems, and nominal-only SMOTE-N and information-retrieval applications are proposals rather than demonstrated results. Displayed ROC comparisons select the best SMOTE configurations among those tried.

The supplied Markdown does not state the publication year or a stable identifier for this version; the year is left unset. Its reference to a 2000 conference version is not treated as this version's publication date.

## Related Concepts

- [[concepts/synthetic-minority-oversampling|Synthetic Minority Oversampling]]: the central mechanism for expanding minority support in feature space.

## Related Papers

- [[papers/the-multiclass-classification-of-newspaper-articles-with-machine-learning-the-hybrid-binary-snowball-approach|The Hybrid Binary Snowball Approach]]: a separate application of majority undersampling to imbalanced text classification; it uses ensemble unanimity and training-set expansion rather than SMOTE.
- Kubat and Matwin (1997), “Addressing the Curse of Imbalanced Training Sets: One Sided Selection”: a cited majority-selection alternative.
- Provost and Fawcett (2001), “Robust Classification for Imprecise Environments”: the cited basis for evaluating potentially optimal classifiers with ROC convex hulls.
