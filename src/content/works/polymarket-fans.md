---
title: Polymarket.fans
year: 2026
summary: 面向预测市场参与者的数据平台，聚合 Polymarket 市场数据，提供行情可视化、持仓分析与策略辅助。
type: 项目案例
tags: [预测市场, 数据平台, 全栈]
role: 独立设计与开发
tools: [Vue 3, TypeScript, FastAPI, PostgreSQL]
links:
  - { label: "在线访问", url: "https://polymarket.fans" }
  - { label: "GitHub", url: "https://github.com/wilkessidney" }
featured: true
order: 1
---

## 背景

预测市场（Prediction Market）是观察群体对事件概率判断的好窗口，但原始数据散、更新快、缺少面向个人的分析视角。市面上的工具大多偏「看热闹」，少有「帮我想清楚」的。

## 目标

做一个轻量、安静、对个人有用的数据平台：既能看行情，也能沉淀自己的分析框架。

## 过程

- 用 FastAPI 拉取并缓存市场数据，解决跨域与限频问题；
- 前端用 Vue 3 + Pinia 组织状态，行情图用自绘 SVG，避免重型图表库；
- v1.1 起加入「关注市场」与简单持仓视图，v2.0 规划自动化交易与鲸鱼追踪。

## 成果

- 稳定聚合数千个活跃市场；
- 移动端可用的阅读体验；
- 形成一套可复用的数据接入层。

## 个人职责

从产品定义、架构设计到前后端实现全部独立完成，重点在「克制」——功能做减法，体验做加法。

## 使用工具

Vue 3、TypeScript、FastAPI、PostgreSQL、Docker。

## 复盘

最大的教训是**不要一次加太多功能**。早期堆了一堆图表，反而没人看得下去。后来砍掉一半，只留最核心的三个视图，留存反而好了。
