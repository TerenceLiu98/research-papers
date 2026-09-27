---
title: Patch Masking for Missing Time-Series Inputs
type: concept
aliases:
  - Missing-Patch Removal
tags:
  - time-series-forecasting
  - missing-data
  - attention-masking
---

## Overview

Patch masking handles incomplete time-series histories by excluding fully missing temporal patches from a model's token sequence. Training-time patch dropout exposes the forecaster to variable observed histories. At inference, removal prevents an entirely zero-filled or otherwise synthetic patch from contributing as if it were a measurement. The task is forecasting from incomplete context, not necessarily reconstructing the missing history.

## Key Ideas

- **Remove tokens while retaining time.** Surviving patches should retain their original temporal positions. Renumbering them as a contiguous history would erase the duration and location of gaps.
- **Decouple output shape from patch count.** A decoder based on a fixed number of summary tokens can forecast after arbitrary numbers of local patches are removed. ChannelTokenFormer uses learned channel summaries for this purpose.
- **Distinguish missingness masks from attention structure.** Removing an unavailable token identifies absent evidence. Restricting attention between local and channel tokens determines which available representations may exchange information. These mechanisms solve different parts of the problem.
- **Match augmentation to the claimed robustness.** Randomly dropping patches is a proxy for input failures. Validation should identify block durations, locations, channel coverage, and whether those conditions match the training distribution. ChannelTokenFormer's controlled tests use patch-length missing blocks.
- **Treat partial patches explicitly.** A fully missing patch can be removed, but an isolated missing value inside an otherwise observed patch remains a separate issue. Zero replacement can also be ambiguous when zero is a valid observation; reliable missingness indicators matter.
- **Measure component gains in context.** At SolarWind missing fraction 0.375, ChannelTokenFormer reports CMSE 0.452 with its full design versus 0.458 without training/test patch masking, while CMAE ties at 0.508 (Table 3). That experiment supports a conditional forecasting benefit, not complete recovery of unavailable information.

## Important Papers

- [[papers/towards-robust-real-world-multivariate-time-series-forecasting-a-unified-framework-for-dependency-asynchrony-and-missingness|Towards Robust Real-World Multivariate Time Series Forecasting: A Unified Framework for Dependency, Asynchrony, and Missingness]] combines random training-time patch masking, inference-time missing-patch removal, and channel-token decoding under asynchronous sampling.
- Liu et al. (2023), "PatchDropout: Economizing Vision Transformers Using Patch Dropout," supplies the training-time token-dropping precedent cited by ChannelTokenFormer; its original setting is vision rather than missing time-series forecasting.

## Related Concepts

- [[concepts/channel-wise-asynchronous-forecasting|Channel-Wise Asynchronous Forecasting]] creates heterogeneous patch counts even before additional observations go missing.
- Missing-value imputation estimates absent values; token removal instead conditions the forecaster on retained information.
- Denoising and masked reconstruction objectives predict withheld observations, whereas the forecasting objective here predicts the future.
