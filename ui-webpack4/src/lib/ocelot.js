export default class OcelotClient {
  constructor(serverBaseUrl, adminApiBaseUrl, axios) {
    this.GetAllSections = function (ifSuccess, ifError) {
      axios.get(adminApiBaseUrl + '/admin/configuration/getAllSections')
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          console.log(error)
          ifError(error)
        })
    }
    this.GetSection = function (name, ifSuccess, ifError) {
      axios.get(adminApiBaseUrl + '/admin/configuration/getSection')
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }
    this.SaveSection = function (json, ifSuccess, ifError) {
      axios.post(adminApiBaseUrl + '/admin/configuration/saveSection', json)
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }
    this.DeleteSection = function (sectionName, ifSuccess, ifError) {
      axios.post(adminApiBaseUrl + '/admin/configuration/deleteSection?name=' + sectionName)
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }
    this.ValidateSection = function (json, ifSuccess, ifError) {
      axios.post(adminApiBaseUrl + '/admin/configuration/validateSections', json)
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }
    this.BuildConfig = function (description, ifSuccess, ifError) {
      axios.post(adminApiBaseUrl + '/admin/configuration/buildConfig?description=' + description)
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }

    this.EnableConfig = function (id, ifSuccess, ifError) {
      axios.post(adminApiBaseUrl + '/admin/configuration/enableConfig?id=' + id)
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }
    this.GetAllConfigs = function (ifSuccess, ifError) {
      axios.get(adminApiBaseUrl + '/admin/configuration/getAllConfigs')
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }
    this.DeleteConfig = function (id, ifSuccess, ifError) {
      axios.post(adminApiBaseUrl + '/admin/configuration/deleteConfig?id=' + id)
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }
    this.ReLoadConfig = function (ifSuccess, ifError) {
      axios.post(serverBaseUrl + '/admin/configuration/reLoad')
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }
    this.CurrentConfig = function (ifSuccess, ifError) {
      axios.get(serverBaseUrl + '/admin/configuration/get')
        .then(response =>
          ifSuccess(response.data)
        ).catch(error => {
          ifError(error)
        })
    }
  }
}
