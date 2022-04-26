import React from 'react'
import ItemTopicTab from './ItemTopicTab'

function ListItemTopicTab({ topics, currentTopicName, changeTopic }) {
    return (
        <ul>
            <li id="0">
                <ItemTopicTab href="/vocabulary/1050" title="Từ vựng tiếng nhật" active={currentTopicName === "all" ? "active" : ""} onClick={(e) => changeTopic(e, "all", 0)}/>
            </li>
            {topics.length !== 0 ? (
                topics.map((topic) => (
                    <li id={topic.id}>
                        <ItemTopicTab href="/vocabulary/1050" title={topic.name} active={currentTopicName === topic.name ? "active" : ""} onClick={(e) => changeTopic(e, topic.name, topic.id)}/>
                    </li>
                ))
            ) : null
            }
        </ul>
    )
}

export default ListItemTopicTab