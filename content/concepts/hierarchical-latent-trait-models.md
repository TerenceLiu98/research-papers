---
title: Hierarchical Latent Trait Models
type: concept
aliases:
  - Higher-Order IRT Models
tags:
  - item-response-theory
  - hierarchical-latent-traits
  - bayesian-measurement
---

## Overview

Hierarchical latent trait models relate specific abilities to more general latent factors. Items measure lower-level traits, while a factor hierarchy models the dependence among those traits and supports inference about broader abilities. The hierarchy concerns relationships among constructs; it is distinct from grouping respondents by school, region, or another sampling unit.

## Key Ideas

- **Two kinds of multidimensionality:** A hierarchy can correlate domain abilities even if each item measures only one domain. Allowing an item to load on several domains is a separate modeling choice.
- **Common prior scale:** In the single-parent construction of Venturelli and colleagues, $\theta_q=\lambda_q\theta_{\mathrm{parent}}+\epsilon_q$, with standard Normal parent and independent residual variance $1-\lambda_q^2$, preserves unit marginal variance. Applying this recursively standardizes the prior scale at every level, without forcing equal posterior uncertainty.
- **Structural identification:** Standardizing scales does not remove all identification requirements. The cited model also restricts parent-child assignments, requires at least three lower traits per upper factor, and imposes restrictions on item discriminations.
- **General scores are model dependent:** A general factor summarizes modeled dependence among domain abilities. It need not coincide with the arithmetic average of domain scores, and its substantive validity requires evidence beyond model fit.
- **Limiting cases:** Zero loadings disconnect domains from a parent; positive loadings approaching one collapse residual domain variation. Recovery near these limits in simulations is distinct from a formal test of dimensionality.
- **Joint inference:** Augmented Bayesian sampling can propagate uncertainty in item parameters, domain abilities, general abilities, and loadings. Blocked trait updates and collapsed threshold updates address posterior dependence, but their computational benefits require empirical assessment.

## Important Papers

- [[papers/multidimensional-bayesian-irt-model-for-hierarchical-latent-structures|Multidimensional Bayesian IRT Model for Hierarchical Latent Structures]]: combines a common-scale hierarchy, cross-loading items, binary pseudo-guessing, and graded responses; evaluates simulated recovery and Enem data.
- de la Torre and Song (2009), "Simultaneous estimation of overall and domain abilities: A higher-order IRT model approach": predecessor discussed in the linked paper.
- Huang et al. (2013), "Higher-order item response models for hierarchical latent traits": predecessor extending the number of hierarchical levels.

## Related Concepts

- [[concepts/item-response-theory|Item Response Theory]]: supplies the measurement model linking traits to item responses.
