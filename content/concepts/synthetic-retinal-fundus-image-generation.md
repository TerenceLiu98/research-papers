---
title: Synthetic Retinal Fundus Image Generation
type: concept
aliases:
  - Synthetic Retinal Image Generation
  - Retinal Fundus Synthesis
tags:
  - synthetic-retinal-images
  - medical-image-synthesis
  - retinal-vessel-networks
---

## Overview

Synthetic retinal fundus image generation creates artificial images of the retina together with known or controllable vascular structure. Such images can supplement scarce expert-labelled data, provide exact segmentation and artery-vein labels, and support controlled studies of vessel morphology. Approaches range from anatomical and procedural models to patch-based rendering and learned generative models.

## Key Ideas

- A fundus generator may model the vascular tree explicitly, synthesize appearance directly, or separate structural generation from photorealistic rendering. Explicit geometry provides labels and control by construction; learned models can capture complex appearance but inherit their structure from training data.
- Structure-and-style factorization offers a learned form of control: a vessel mask can condition spatial normalization while a latent code controls colour and texture. Holding either factor fixed permits targeted variation, but the decomposition is useful only insofar as pathology-relevant details remain represented.
- Retinal plausibility depends on more than local texture. Vessel endpoints, branching depth and position, calibre decay, tortuosity, artery-vein differences, crossings, the foveal exclusion region, and alignment with the optic disc and major temporal arcade all contribute to global structure.
- Exact synthetic ground truth is useful for testing segmentation and classification systems, but visual plausibility or agreement on summary statistics does not establish improved downstream performance or clinical validity.
- Evaluation can compare morphometric distributions, topology, image statistics, perceptual quality, and performance of models trained with synthetic data. These criteria answer different questions and should not be treated as interchangeable.
- Controllable generation can represent hypothetical pathological morphologies, but clinical use requires pathology-specific evidence and expert or outcome-based validation beyond the ability to edit vessel parameters.

## Important Papers

- [[papers/a-visual-framework-to-create-photorealistic-retinal-vessels-for-diagnosis-purposes|A Visual Framework to Create Photorealistic Retinal Vessels for Diagnosis Purposes]]: procedural vessel-tree generation using probability maps, Catmull-Rom curves, artery-vein rendering, and interactive editing.
- [[papers/vsg-gan-a-high-fidelity-image-synthesis-method-with-semantic-manipulation-in-retinal-fundus-image|VSG-GAN: A High-Fidelity Image Synthesis Method with Semantic Manipulation in Retinal Fundus Image]]: separates vessel structure from hierarchical background style using SPADE, AdaIN, and a variational encoder, then evaluates synthesis and diabetic-retinopathy augmentation.
- Fiorini et al. (2014), "Automatic Generation of Synthetic Retinal Fundus Images": patch-based synthesis of vascular and non-vascular regions, cited by Lo Castro et al.
- Costa et al. (2018), "End-to-end adversarial retinal image synthesis": GAN-based generation of retinal vessel trees and fundus images, cited by Lo Castro et al.
- Zhao et al. (2018), "Synthesizing Retinal and Neuronal Images with Generative Adversarial Nets": learned retinal image synthesis, cited by Lo Castro et al.

## Related Concepts

- [[concepts/statistical-shape-graphs|Statistical Shape Graphs]]: represents complete vessel networks for geometric comparison and population-level analysis.
- [[concepts/effective-resistance-graph-coarsening|Effective Resistance Graph Coarsening]]: reduces extracted retinal networks to comparable resolutions for shape analysis.
