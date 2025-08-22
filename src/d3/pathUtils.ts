import * as d3 from 'd3';

interface Point {
    x: number;
    y: number;
}

export const calculatePath = (data: Point[]): string | null => {
    const line = d3.line<Point>()
        .x(d => d.x)
        .y(d => d.y);

    return line(data);
};

export const generateRandomPath = (numPoints: number, width: number, height: number): Point[] => {
    const points = Array.from({ length: numPoints }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
    }));

    return points;
};

export const updatePath = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, pathData: Point[]): void => {
    svg.selectAll('path')
        .data([pathData])
        .join('path')
        .attr('d', d => calculatePath(d))
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2);
};