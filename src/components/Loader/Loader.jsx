import { ThreeDots } from "react-loader-spinner";

export const Loader = () => {
	return (
		<ThreeDots
			height='50'
			width='50'
			radius='9'
			color='#6213ebea'
			ariaLabel='three-dots-loading'
			wrapperStyle={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		/>
	);
};
