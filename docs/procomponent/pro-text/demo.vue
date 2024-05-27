<script setup lang="ts">
import { ProText } from '@banmao/procomponent'
</script>

<template>
  <ProText text="这是一款文字，用于展示文字内容" />
  <ProText text="这是一款文字，用于展示文字内容" type="success" />
  <ProText text="这是一款文字，用于展示文字内容" type="info" />
  <ProText text="这是一款文字，用于展示文字内容" type="warning" />
  <ProText text="这是一款文字，用于展示文字内容" type="error" />

  <ProText text="《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6 月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演 Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987 年被阿尔弗雷德伯恩鲍姆译成英文。"
    ellipsis
  />

</template>
