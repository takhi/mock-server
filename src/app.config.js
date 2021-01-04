const config = {
  JSON_STRUCTURE: {
    CONDITION: {
      POST: {
        BODY: 'withReqBody'
      },
      GET: {
        PARAM: 'withReqParam',
        QUERY: 'withReqQuery' 
      }
    },
    ARRAY: 'mockResponses',
    ID: {
      POST: {
        BODY: 'reqBody'
      },
      GET: {
        PARAM: 'reqParam',
        QUERY: 'reqQuery'
      }
    },
    OUTPUT: 'response',
    CONFIG: 'resConfig',
    _DEFAULT: '_default'
  }
}

module.exports = config;