import Badge from "react-bootstrap/Badge";
import PropTypes from 'prop-types';
import { UI_COLORS } from '../../constants';
import { getBadgeColor } from '../../utils/helpers';

/**
 * Badge component for showing status, severity, or priority
 * @param {Object} props - Component props
 * @param {string} props.type - Type of badge (severity, priority, status)
 * @param {string} props.value - Value to display
 * @param {boolean} props.pill - Whether to use pill style
 * @param {string} props.className - Additional CSS classes
 */
const BadgeStatus = ({ type, value, pill = true, className = '' }) => {
    if (!value) return null;

    // Determine badge color based on type
    let color;
    let displayValue;

    switch (type.toLowerCase()) {
        case 'severity':
            color = getBadgeColor(value, UI_COLORS);
            displayValue = `Severity: ${value}`;
            break;
        case 'priority':
            color = getBadgeColor(value, UI_COLORS);
            displayValue = `Priority: ${value}`;
            break;
        case 'status':
            // Status is either solved (true) or unsolved (false)
            color = value ? 'success' : 'danger';
            displayValue = value ? 'Solved' : 'Unsolved';
            break;
        default:
            color = 'secondary';
            displayValue = value;
    }

    return (
        <Badge
            bg={color}
            pill={pill}
            className={`px-3 ${className}`}
        >
            {displayValue}
        </Badge>
    );
};

BadgeStatus.propTypes = {
    type: PropTypes.oneOf(['severity', 'priority', 'status']).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    pill: PropTypes.bool,
    className: PropTypes.string
};

export default BadgeStatus;
