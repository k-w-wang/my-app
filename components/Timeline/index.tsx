import React, { ReactNode } from "react";
import "./timeline.css";

interface Item {
	label: ReactNode;
	date: ReactNode;
	children: ReactNode;
}

interface IProps {
	items: Item[];
}
const Timeline: React.FC<IProps> = ({ items }) => {
	return (
		<div className="time-line">
			{items.map((item, index) => {
				return (
					<div key={index} className="time-line-item">
						<div className="left-line">
							<div
								className={
									index !== 0
										? "line-circular"
										: "line-circular line-circular-new"
								}
							></div>
							<div className="line-dsashed"></div>
						</div>
						<div className="right-content">
							<div className="right-content-top">
								<span>{item.label}</span>
								<span>{item.date}</span>
							</div>
							<div className="right-content-children">{item.children}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Timeline;
