const React = require('react');
const highlightjs = require('./highlight.js');
const PropTypes = require('prop-types');

function Heading(props) {
    return React.createElement(`h${props.level}`, { className: `title is-${props.level}` }, props.children);
}

class CodeBlock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.setRef = this.setRef.bind(this);
    }

    setRef(el) {
        this.codeEl = el;
    }

    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        highlightjs.highlightBlock(this.codeEl);
    }

    render() {
        return (
            <pre>
                <code ref={this.setRef} className={this.props.language}>
                    {this.props.value}
                </code>
             </pre>
        );
    }
}

CodeBlock.defaultProps = {
    language: ''
};

CodeBlock.propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
};

module.exports = {
    heading: Heading,
    code: CodeBlock,
};
