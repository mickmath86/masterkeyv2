declare module "splitting" {
    interface SplittingOptions {
        target?: string | Element | Element[];
        by?: string;
        key?: string;
        rows?: number;
        columns?: number;
    }

    function Splitting(options?: SplittingOptions): Element[];
    export = Splitting;
}
