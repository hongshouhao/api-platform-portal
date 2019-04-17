<template>
  <div></div>
</template>
<script>
import { Env } from "../../lib/env";

var { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://192.168.84.24:9200",
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true
});

export default {
  data() {
    return {};
  },
  mounted() {
    this.client
      .search(
        {
          index: "endpoint_avg",
          body: {
            aggs: {
              "2": {
                histogram: {
                  field: "time_bucket",
                  interval: 10000,
                  min_doc_count: 1
                },
                aggs: {
                  "3": {
                    terms: {
                      field: "entity_id",
                      size: 5,
                      order: {
                        "1": "desc"
                      }
                    },
                    aggs: {
                      "1": {
                        sum: {
                          field: "count"
                        }
                      }
                    }
                  }
                }
              }
            },
            size: 0,
            _source: {
              excludes: []
            },
            stored_fields: ["*"],
            script_fields: {},
            docvalue_fields: [],
            query: {
              bool: {
                must: [
                  {
                    match_all: {}
                  },
                  {
                    match_all: {}
                  },
                  {
                    range: {
                      time_bucket: {
                        gte: 201904150000,
                        lt: 201904170000
                      }
                    }
                  },
                  {
                    range: {
                      time_bucket: {
                        gte: 201904150000,
                        lt: 201904170000
                      }
                    }
                  }
                ],
                filter: [],
                should: [],
                must_not: []
              }
            },
            timeout: "30000ms"
          }
        },
        function() {}
      )
      .then(
        function(resp) {
          console.log(resp);
          debugger;
        },
        function(err) {
          console.trace(err.message);
          debugger;
        }
      );
  }
};
</script>
