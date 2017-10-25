import { range } from "lodash";
import React from "react";

export const BlueStripes = () => (
    <div className="stripes-container blue-stripes">
        <div className="stripes">{range(5).map(i => <span key={i} />)}</div>
    </div>
);

export const PurpleStripes = () => (
    <div className="stripes-container purple-stripes">
        <div className="stripes">
            <div className="stripe s4" />
            <div className="stripe s5" />
            <div className="background" />
            <div className="stripe s1" />
            <div className="stripe s2" />
            <div className="stripe s3" />
        </div>
    </div>
);
