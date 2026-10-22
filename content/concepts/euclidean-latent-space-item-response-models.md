---
title: Euclidean Latent Space Item Response Models
type: concept
aliases:
  - Euclidean LSIRM
  - Distance-Based LSIRM
tags:
  - latent-space-models
  - item-response-theory
  - bipartite-networks
  - ideal-point-estimation
---

## Overview

Euclidean latent space item response models place respondents and items in a shared metric space. A response becomes more likely when the respondent and item are close, after accounting for respondent and item intercepts. In roll-call analysis, legislators and bills become the two node sets of a bipartite network, so bill positions can help interpret political dimensions and coalition structure.

## Key Ideas

- **Distance is the interaction:** A typical binary model uses $\operatorname{logit}\Pr(Y_{ij}=1)=\theta_i+\beta_j-\gamma\lVert z_i-w_j\rVert_2$. Intercepts capture overall response and item tendencies; $\gamma$ controls the contribution of proximity.
- **Metric geometry supports distance-based summaries:** Euclidean distance satisfies the triangle inequality. Clustering, dispersion, and relative proximity therefore have a coherent metric interpretation, conditional on the model being appropriate.
- **Items anchor interpretation:** Jointly locating items and respondents lets researchers ask which observed items define separation between groups, rather than assigning meaning from respondent coordinates alone.
- **Geometry and prediction are different criteria:** A metric embedding can recover planted clusters or clarify an empirical map without improving held-out response prediction over an inner-product model.
- **Coordinates are not intrinsically identified:** Joint translation, rotation, and reflection preserve distances. Priors set scale conventions, while anchoring or Procrustes alignment is needed to compare posterior configurations; substantive axis labels still require evidence.
- **Proximity is an assumption:** The model favors homophilous response patterns. Non-monotonic behavior, strategic abstention, temporal movement, or issue-specific mechanisms may require extensions rather than additional dimensions alone.

## Important Papers

- [[papers/euclidean-ideal-point-estimation-from-roll-call-data-via-distance-based-bipartite-network-models|Euclidean Ideal Point Estimation From Roll-Call Data via Distance-Based Bipartite Network Models]]: adapts Euclidean LSIRM to roll calls, evaluates faction and cross-party coalition recovery, and jointly embeds legislators and bills from the 118th U.S. House.
- Jeon et al. (2021), "Mapping Unobserved Item-Respondent Interactions: A Latent Space Item Response Model with Interaction Map": the LSIRM foundation cited by Lee et al.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: respondent-item models based on latent traits and item characteristics.
- [[concepts/joint-latent-space-models|Joint Latent Space Models]]: shared representations linking multiple node or observation types.
- [[concepts/rotational-invariance-in-ideal-point-models|Rotational Invariance in Ideal-Point Models]]: identification and alignment of multidimensional positions.
- [[concepts/normalized-roll-call-voting-distance|Normalized Roll-Call Voting Distance]]: a descriptive Euclidean distance between observed aggregate vote profiles rather than a latent response model.
