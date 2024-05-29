import React, { Component } from "react";
//import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
//import styles from "../FileUpload/fileupload.module.scss";
//import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
//require("dotenv").config();

class IntergrateUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initially, no file is selected
      selectedFile: null,
      ProviderId: null,
      selectedProvider: null,
      base64TextString: "",
      errorMessage: "",
      visible: true
    };
    this.closeDialog = this.closeDialog.bind(this);
  }
  /*   constructor(props) {
    super(props);
    this.state = { visible: true };
    this.closeDialog = this.closeDialog.bind(this);
  } */
  //Dialog Close
  /*   closeDialog = () => {
    console.log("No");
    this.setState({ setVisible: false });
  }; */

  closeDialog = () => {
    console.log("No");
    this.setState({ visisble? false : true });
  }

  /*   state = {
    // Initially, no file is selected
    selectedFile: null,
    ProviderId: null,
    selectedProvider: null,
    base64TextString: "",
    errorMessage: "",
    visible: true,
    setVisible: true,
  }; */

  // On file select (from the pop up)
  onFileChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

    event.onProviderChange = (newProvider) => {
      this.setState({ selectedProvider: newProvider });
    };

    // Update the state
    this.setState({ selectedFile: file });
  };

  isDisabled = () => {
    //logic to define if button should be disabled or not
    //return boolean true or false based on that
    if (this.state.selectedFile == null) {
      return true;
    }
    return false;
  };

  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      base64TextString: btoa(binaryString),
    });
  };

  // On file upload (click the upload button)
  onFileUpload = (event) => {
    event.preventDefault();
    if (this.state.selectedFile == null) {
      this.setState({ errorMessage: "Please select a file first." });
      return;
    }

    //if (ddProviders.)
    var payload = {
      ProviderIdFk: parseInt(this.state.selectedProvider, 10),
      FileName: this.state.selectedFile.name,
      UploadFileTypeGuidFk: "12B85FFF-5422-4331-84B1-36FA87827E61",
      UploadDate: this.state.selectedFile.lastModifiedDate.toISOString(),
      FileBlob: this.state.base64TextString,
      Enabled: true,
    };

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    var serviceURI =
      process.env.REACT_APP_API_URL + "EventSubmissionMappingDocs";
    axios
      .post(serviceURI, payload)
      .then((response) => this.setState({ ProviderId: response.data.id }))
      .catch((err) => {
        this.setState({ errorMessage: err.response.data.error });
      });
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        /*         <div>          
          <br />
          <br />
          <h4>File Details:</h4>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
             {this.state.selectedFile.lastModifiedDate.toDateString()}  
          </p>
        </div> */

        <Dialog title={"Please confirm"} onClose={this.closeDialog}>
          <p style={{ margin: "25px", textAlign: "center" }}>
            Are you sure you want to Upload the file?<br></br>
            <h6>File Details</h6>
            <p>File Name: {this.state.selectedFile.name}</p>
            {/*  <p>File Type: {this.state.selectedFile.type}</p> */}
          </p>
          <DialogActionsBar>
            <button className="k-button" onClick={this.closeDialog}>
              No
            </button>
            <button className="k-button" onClick={this.onFileUpload}>
              Upload
            </button>
          </DialogActionsBar>
        </Dialog>
      );
    } else {
      return (
        <div>
          <br />
        </div>
      );
    }
  };

  onProviderChange = (newProvider) => {
    this.setState({ selectedProvider: newProvider });
  };

  render() {
    return (
      <div className="App">
        <br />
        <br />
        <h3>Add a New Provider(IntegratedUpload)</h3>
        <div>
          <br />
        </div>
        <div>
          <label htmlFor="myInput" className={styles.fileuploadbg}>
            <IconButton color="primary" component="span">
              <span class="k-icon k-i-upload"></span>{" "}
              <div className={styles.fileuploadbg}>
                Upload New Mapping Documents
              </div>
            </IconButton>
          </label>
          <input
            id="myInput"
            style={{ display: "none" }}
            type={"file"}
            onChange={this.onFileChange}
            name="uploadedFile"
            accept=".xlsx,.xlsm,.xls"
          />
        </div>

        <br></br>
        {/*         <div>
          <button
            id="btnUpload"
            onClick={this.onFileUpload}
            disabled={this.isDisabled()}
          >
            Upload!
          </button>
        </div> */}
        {this.fileData()}
        {this.state.errorMessage && (
          <h3 className="error">
            {" "}
            {this.state.errorMessage.split("\n").map((i, key) => {
              return <div key={key}>{i}</div>;
            })}{" "}
          </h3>
        )}
      </div>
    );
  }
}

export default IntergrateUpload;
