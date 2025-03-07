import { Children } from "react";

const EachElement = <T,>({ of, render }: { of: T[], render: (item: T, index: number) => React.ReactNode }) => Children.toArray(of.map(render));

export default EachElement;