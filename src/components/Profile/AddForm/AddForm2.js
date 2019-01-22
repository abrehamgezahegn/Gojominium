import React, { Component } from "react";
import Uploadform from "./Uploadform";
import CondoInfo from "./CondoInfo";
import AdditionalInfo from "./AdditionalInfo";
import { Steps } from "antd";
import "./AddForm2.css";
import "antd/dist/antd.css";
import { Animation } from "mdbreact";
import uuid from "uuid";
import axios from "axios";
import jwt from "jsonwebtoken";
import { herokuApi } from "../../../config/apiroutes";
import { storage } from "../../../firebase/firebaseConfig";

const Step = Steps.Step;

const steps = [
	{
		title: "Choose images"
	},
	{
		title: "Provide Info"
	},
	{
		title: "Additional"
	}
];

class AddForm2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			userId: "",
			id: uuid(),
			apType: "",
			location: "",
			type: "",
			status: "",
			phoneNo: "",
			floor: "",
			price: "",
			area: "",
			description: "",
			kitchencabinate: false,
			tiles: false,
			gypsum: false,
			spotlights: false,
			ceramics: false,
			addFeatures: [],
			featured: false,
			images: [],
			imageUrls: [],
			editImages: [],
			errorMessage: "",
			isTyping: false,
			pricePlaceH: "Price",
			isLoading: false
		};
	}

	componentWillMount() {
		const token = localStorage.getItem("token");
		const { userId } = jwt.decode(token);
		this.setState({ userId: userId });
	}

	componentDidMount() {
		console.log(this.props.editCondo);

		if (this.props.editCondo) {
			const {
				id,
				aptype,
				location,
				type,
				sellorrent,
				phonenumber,
				floor,
				price,
				area,
				description,
				kitchencabinate,
				tiles,
				gypsum,
				spotlights,
				ceramics,
				image1,
				image2,
				image3,
				image4,
				image5,
				image6,
				image7,
				image8,
				image9,
				image10
			} = this.props.editCondo;
			this.setState({
				id,
				apType: aptype,
				location,
				type,
				status: sellorrent,
				phoneNo: phonenumber,
				floor,
				price: price.toString(),
				area: area.toString(),
				description,
				kitchencabinate,
				tiles,
				gypsum,
				spotlights,
				ceramics,
				editImages: [
					image1,
					image2,
					image3,
					image4,
					image5,
					image6,
					image7,
					image8,
					image9,
					image10
				]
			});

			const editFeaturesArray = [];
			if (kitchencabinate) {
				editFeaturesArray.push("kitchencabinet");
			}
			if (tiles) {
				editFeaturesArray.push("tiles");
			}
			if (gypsum) {
				editFeaturesArray.push("gypsum");
			}
			if (spotlights) {
				editFeaturesArray.push("spotlights");
			}
			if (ceramics) {
				editFeaturesArray.push("ceramics");
			}
			this.setState({ addFeatures: editFeaturesArray });
		}
	}

	//*******Change Handlers********//

	handleApTypeChange = value => {
		this.setState({ apType: value, location: "" });
	};

	handleLocChange = value => {
		this.setState({ location: value });
	};
	handleTypeChange = type => {
		this.setState({ type });
	};
	handleStatusChange = status => {
		this.setState({ status });
		this.setState({ pricePlaceH: "" });
	};

	handleFloorChange = floor => {
		this.setState({ floor });
	};
	handleDescriptionChange = e => {
		const description = e.target.value;
		this.setState({ description, isLoading: false });
	};
	handleCheckChange = addFeatures => {
		this.setState({ addFeatures, isLoading: false });
	};

	handelPriceChange = e => {
		const price = e.target.value;

		if (this.state.status === "For rent") {
			if (!price || price.match(/^\d{1,6}?$/)) {
				this.setState({ price });
			}
		} else if (this.state.status === "For sell " || "for sell") {
			if (!price || price.match(/^\d{1,11}?$/)) {
				this.setState({ price });
			}
		} else {
			this.setState({ price: "" });
		}
	};
	handleAreaChange = e => {
		const area = e.target.value;
		if (area.length < 7)
			if (!area || area.match(/^\d{1,4}(\.\d{0,2})?$/)) {
				this.setState({ area });
			}
	};
	handlePhoneChange = phoneNo => {
		this.setState({ isTyping: true });

		if (!phoneNo || phoneNo.match(/\+\d{3,12}?$/))
			this.setState({ phoneNo });
	};

	toggleFeatured = () => {
		this.setState({ featured: !this.state.featured, isLoading: false });
	};

	onImageClear = () => {
		this.setState({ images: [], imageUrls: [], editImages: [] });
	};

	//******************************************************//

	//**********form navigation handlers**************//

	nextImage = images => {
		const current = this.state.current + 1;

		this.setState({ current, images });
	};

	nextMain = () => {
		const {
			apType,
			location,
			type,
			status,
			phoneNo,
			floor,
			price
		} = this.state;
		if (
			(!!apType,
			!!location &&
				!!type &&
				!!status &&
				phoneNo.length === 13 &&
				!!floor &&
				!!price)
		) {
			const current = this.state.current + 1;

			this.setState({
				errorMessage: "",
				current
			});
		} else {
			this.setState({
				errorMessage: "Please fillout all the requested forms"
			});
		}
	};

	prev = () => {
		const current = this.state.current - 1;
		this.setState({ current, isLoading: false });
	};

	//***************************************************//

	uploadImagesToFirebase = () => {
		this.state.images.map(image => {
			const uploadTask = storage
				.ref(`${this.state.id}/${image.name}`)
				.put(image);
			uploadTask.on(
				"state_changed",
				snapshot => {},
				error => {
					console.log(error);
				},
				() => {
					storage
						.ref(`${this.state.id}`)
						.child(image.name)
						.getDownloadURL()
						.then(url => {
							this.setState({
								imageUrls: [...this.state.imageUrls, url]
							});
						})
						.then(() => {
							if (
								this.state.images.length ===
								this.state.imageUrls.length
							) {
								console.log(this.state.imageUrls);
								this.saveToDatabase();
							}
						});
				}
			);
		});
	};

	setCondoObject = () => {
		const checkFeature = feature =>
			this.state.addFeatures.includes(feature);

		const imageUrls1 = this.state.editImages.filter(url => url !== null);
		const imageUrls2 = this.state.imageUrls.filter(url => url !== null);

		const imageUrls3 = [...imageUrls1, ...imageUrls2];

		const condominium = {
			ownerid: this.state.userId,
			condoid: this.state.id,
			apType: this.state.apType,
			location: this.state.location,
			type: this.state.type,
			sellorrent: this.state.status,
			phonenumber: this.state.phoneNo,
			floor: this.state.floor,
			price: parseFloat(this.state.price),
			area: parseFloat(this.state.area),
			description: this.state.description,
			kitchencabinate: checkFeature("kitchencabinet") ? true : false,
			tiles: checkFeature("tiles") ? true : false,
			gypsum: checkFeature("gypsum") ? true : false,
			spotlights: checkFeature("spotlights") ? true : false,
			ceramics: checkFeature("ceramics") ? true : false,
			featured: this.state.featured,
			images: imageUrls3
		};

		return condominium;
	};

	submitForm = () => {
		this.setState({ isLoading: true });

		// image upload

		this.uploadImagesToFirebase();
	};

	saveToDatabase = () => {
		console.log(" all images uploaded am saving to database");
		//setting up cononminium infos
		const condominium = this.setCondoObject();

		console.log(condominium);

		if (!!this.props.editCondo) {
			axios({
				method: "put",
				url: `${herokuApi}/edit_condo`,
				data: condominium
			}).then(res => {
				if (res) {
					if (res.data === "successfully editted") {
						this.props.historyPush();
					} else {
						this.setState({
							errorMessage:
								"Something went wrong please try agian!!"
						});
					}
				}
			});
		} else if (!!condominium) {
			axios({
				method: "post",
				url: `${herokuApi}/post`,
				data: condominium
			}).then(res => {
				if (res) {
					if (res.data === "successfully posted") {
						this.props.historyPush();
					}
				} else {
					this.setState({
						errorMessage: "Something went wrong please try agian!!"
					});
				}
			});
		}
	};

	render() {
		const { current } = this.state;

		console.log(this.state);

		return (
			<div className="step-form-main-container">
				<div className="step-form-header">
					{!!this.props.editCondo ? <p> Edit </p> : <p> Post New </p>}
				</div>
				<form>
					<Steps current={current}>
						{steps.map(item => (
							<Step key={item.title} title={item.title} />
						))}
					</Steps>
					<div className="steps-content">
						{current === 0 && (
							<Uploadform
								current={current}
								steps={steps}
								nextImage={this.nextImage}
								onImageClear={this.onImageClear}
								prev={this.prev}
								userId={this.state.userId}
								images={this.state.images}
								editImages={this.state.editImages}
							/>
						)}
						{current === 1 && (
							<CondoInfo
								current={current}
								steps={steps}
								nextMain={this.nextMain}
								prev={this.prev}
								handleApTypeChange={this.handleApTypeChange}
								handleLocChange={this.handleLocChange}
								handleTypeChange={this.handleTypeChange}
								handleStatusChange={this.handleStatusChange}
								handleFloorChange={this.handleFloorChange}
								handlePhoneChange={this.handlePhoneChange}
								handelPriceChange={this.handelPriceChange}
								state={this.state}
								errorMessage={this.state.errorMessage}
								isTyping={this.state.isTyping}
								pricePlaceH={this.state.pricePlaceH}
								handleAreaChange={this.handleAreaChange}
							/>
						)}
						{current === 2 && (
							<AdditionalInfo
								current={current}
								steps={steps}
								next={this.nextImage}
								prev={this.prev}
								handleDescriptionChange={
									this.handleDescriptionChange
								}
								handleCheckChange={this.handleCheckChange}
								state={this.state}
								submitForm={this.submitForm}
								editCondo={this.props.editCondo}
								toggleFeatured={this.toggleFeatured}
								isLoading={this.state.isLoading}
							/>
						)}
					</div>
				</form>
			</div>
		);
	}
}

export default AddForm2;
