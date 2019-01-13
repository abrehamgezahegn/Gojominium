import React, { Component } from "react";
import AddForm2 from "../AddForm/AddForm2";

class EditForm extends Component {
	render() {
		return (
			<div style={{ marginTop: "120px" }}>
				<AddForm2
					editCondo={this.props.location.state.editCondo}
					historyPush={() => {
						this.props.history.push("/condos");
					}}
				/>
			</div>
		);
	}
}

export default EditForm;
