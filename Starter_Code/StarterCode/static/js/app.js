const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    d3.json(url).then((data) => {
    console.log(data);

    let names = data.names
    console.log(names);

    chart(names[0])
    table(names[0])
});

}

function chart(input_id) {

    d3.json(url).then((data) => {
    let sample = data.samples.filter((sample) => sample.id === input_id)[0];
    let otu_ids = [];
    let sample_values = [];
    let otu_labels = [];

    for (let i = 0; i < 10 && i < sample.otu_ids.length; i++) {
      otu_ids.push(`OTU ${sample.otu_ids[i]}`);
      sample_values.push(sample.sample_values[i]);
      otu_labels.push(sample.otu_labels[i]);
    }
        otu_ids.reverse();
        sample_values.reverse();
        otu_labels.reverse()

    let traceData = [{
        x: sample_values,
        y: otu_ids,
        text: otu_labels, 
        type: 'bar',
        orientation: 'h',
    }];

    let layout = {
        title: "Top 10 OTUs",
    };

    Plotly.newPlot("bar", traceData, layout);

    let bubbleTraceData = [{
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
          size: sample.sample_values,
          color: sample.otu_ids,
          colorscale: 'Earth'
        }
    }];

    let bubbleLayout = {
        xaxis: {title: 'OTU ID'},
    };
        Plotly.newPlot("bubble", bubbleTraceData, bubbleLayout);
        
    });
}

function table(input_id){
    d3.json(url).then((data) => {
        console.log(data);

        let metadata = data.metadata
        console.log(metadata);
    
        let metasample = metadata.filter((x) => x.id == input_id)[0];
        console.log(metasample)
    
        let metadatainfo = d3.select("#sample-metadata");
        metadatainfo.html("")

        Object.entries(metasample).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
            metadatainfo.append("h5").text(`${key}:${value}`)

          });
    
    });
    
}
init();