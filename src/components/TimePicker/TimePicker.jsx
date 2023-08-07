import { Space, TimePicker } from "antd";

import PropTypes from "prop-types";
import { useMedia } from "react-use";
import "./TimePicker.css";
import css from "./TimePicker.module.css";
export const TimePickerComponent = ({ setFieldValue, onClose }) => {
	const mobile = useMedia("(max-width: 767px)", { defaultState: false });
	const tablet = useMedia("(min-width: 768px) and (max-width: 1439px)", {
		defaultState: true,
	});
	const desk = useMedia("(min-width: 1440px)", { defaultState: false });

	const onChange = (time, timeString) => {
		setFieldValue("selectTime", timeString);
		onClose();
	};

	const getPickerWidth = () => {
		let screen;
		if (desk) {
			screen = "372";
			return screen;
		}
		if (tablet) {
			screen = "308";
			return screen;
		}
		if (mobile) {
			screen = "240";
			return screen;
		}
	};

	return (
		<div className={css.enabled}>
			<Space wrap>
				<TimePicker
					use12Hours
					format='h:mm a'
					onChange={onChange}
					className='time-picker'
					popupClassName='custom-time-picker'
					placeholder='Select Time'
					allowClear='false'
					popupStyle={{ width: `${getPickerWidth()}px`, height: "160px" }}
				/>
			</Space>
		</div>
	);
};

TimePickerComponent.propTypes = {
	setFieldValue: PropTypes.func,
	handleSaveTime: PropTypes.func,
	onClose: PropTypes.func,
};
