import { getTime } from "date-fns";

function getTimestamp() {
	return getTime(new Date());
}

const timestamp = getTimestamp();

export default timestamp ;
