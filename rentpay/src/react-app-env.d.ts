/// <reference types="react-scripts" />

// �ֶ�������Ӷ�������Ͷ���
declare namespace NodeJS {
    // interface ���Ͷ���ϲ���Դ�������е� NodeJS.ProcessEnv
    interface ProcessEnv {
        readonly REACT_APP_BASE_URL: string;
    }
}
