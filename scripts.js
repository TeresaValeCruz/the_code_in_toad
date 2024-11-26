// script.js

const channel = new BroadcastChannel('svg_channel');
const popBubble = new BroadcastChannel('bubble');

// Listen for messages from the SVG file
popBubble.onmessage = (event) => {
    speech = document.getElementById('speechBubble');
    speech.style.visibility = 'hidden';
    popBubble.close();
}

channel.onmessage = (event) => {
    const { x, y, width, height } = event.data;
    // console.log('HTML: Received bounding rectangle:', event.data);

    var margin;
    margin = height * 0.15;

    const svgPoint = document.getElementById('svgContainer').getBoundingClientRect();
    const svgCoor = {
        x: svgPoint.x,
        y: svgPoint.y
    };

    // Create a new div and set its position and dimensions
    const newDiv = document.createElement('div');
    newDiv.style.zIndex = -1;
    newDiv.style.position = 'absolute';
    newDiv.style.left = `${x + svgCoor.x - 1.5*margin}px`;
    newDiv.style.top = `${y + svgCoor.y - margin}px`;
    newDiv.style.width = `${width * 1.2 + 2 * margin}px`;
    newDiv.style.height = `${height * 1.2 + 2 * margin}px`;
    newDiv.style.borderRadius = `${margin / 6}px`;
    newDiv.classList.add('offWhite');

    // Add the new div to the body of the document
    document.body.appendChild(newDiv);

    setTimeout(() => {
        document.body.style.backgroundColor = '#1a2933';
    }, 10);

    // console.log('Closing BroadcastChannel...');
    channel.close();
};
