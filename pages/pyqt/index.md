---
prev: false
next: false
---
# 欢迎

欢迎来到 PyQt 中文教程，这里提供了 PyQt5 和 PyQt6 两个教程。

教程翻译自 zetcode。项目地址：[PyQt-Chinese-tutorial](https://github.com/maicss/PyQt-Chinese-tutorial)。

<div :class="$style.container">
    <a href="./v5/" :class="$style.card">
        <span>PyQt5 教程</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" data-rnwibasecard--161t3wu-hover="true" data-rnwi-handle="nearest" class="r-1rasi3h" style="width: 24px; height: 24px;"><path fill="currentColor" fill-rule="evenodd" d="M9.076 3.576a.6.6 0 0 1 .848 0l4 4a.6.6 0 0 1 0 .848l-4 4a.6.6 0 0 1-.848-.848L12.052 8.6H2.5a.6.6 0 0 1 0-1.2h9.552L9.076 4.424a.6.6 0 0 1 0-.848Z" clip-rule="evenodd"></path></svg>
    </a>
    <a href="./v6/" :class="$style.card">
        <span>PyQt6 教程</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" data-rnwibasecard--161t3wu-hover="true" data-rnwi-handle="nearest" class="r-1rasi3h" style="width: 24px; height: 24px;"><path fill="currentColor" fill-rule="evenodd" d="M9.076 3.576a.6.6 0 0 1 .848 0l4 4a.6.6 0 0 1 0 .848l-4 4a.6.6 0 0 1-.848-.848L12.052 8.6H2.5a.6.6 0 0 1 0-1.2h9.552L9.076 4.424a.6.6 0 0 1 0-.848Z" clip-rule="evenodd"></path></svg>
    </a>
</div>

<script setup>


</script>

<style module>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 16px;
}

.container .card {
    transition: all 0.15s;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #e3e8ed;
    padding: 16px;
    flex: 1;
    color: #3b454e;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
}

.card:hover {
    box-shadow: 0px 12px 13px rgba(0,0,0,0.02);
    transform: translateY(-2px);
    color: #3884ff;
    text-decoration: underline;
    text-underline-offset: 4px;
}
</style>

