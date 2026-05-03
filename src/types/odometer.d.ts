declare module "odometer" {
    interface OdometerOptions {
        el: HTMLElement;
        value?: number;
        format?: string;
        theme?: string;
        duration?: number;
    }

    class Odometer {
        constructor(options: OdometerOptions);
        update(value: number): void;
    }

    export default Odometer;
}
