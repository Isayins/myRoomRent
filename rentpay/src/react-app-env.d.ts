/// <reference types="react-scripts" />

// 手动声明添加额外的类型定义
declare namespace NodeJS {
    // interface 类型定义合并到源码类型中的 NodeJS.ProcessEnv
    interface ProcessEnv {
        readonly REACT_APP_BASE_URL: string;
    }
}
