import { range } from "lodash";
import React from "react";

export const BlueStripes = () => (
  <div className="blue-stripes">
    <div className="stripes">{range(5).map(i => <span key={i} />)}</div>
  </div>
);
