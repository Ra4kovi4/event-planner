import { useState } from "react";

import css from "./ChangeLanguageForm.module.css";

export const ChangeLanguageForm = () => {
	const [contactType, setContactType] = useState("UK");
	const handleContactTypeChange = (event) => {
		setContactType(event.target.value);
	};

	return (
		<form>
			<select
				className={css.select}
				id='contact-type'
				value={contactType}
				disabled
				onChange={handleContactTypeChange}>
				<option className={css.option} value='UK'>
					UK
				</option>
				<option className={css.option} value='EN'>
					EN
				</option>
			</select>
		</form>
	);
};
