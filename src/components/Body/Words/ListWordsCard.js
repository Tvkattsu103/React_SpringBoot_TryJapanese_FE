import React from 'react'
import WordsCard from './WordsCard'

function ListWordsCard({ wordsShow }) {
    return (
        <div className="list-words">
            <div className="row">
                {wordsShow.length === 0 ? (
                    <div style={{ marginLeft: '20px', fontSize: '20px' }} >
                        <p>No Words Available.</p>
                    </div>
                ) : (
                    wordsShow.map((word) => (
                        <WordsCard
                            href={`/vocab/${word.id}`}
                            src={word.photoURL}
                            title={word.title}
                            wordsnumber={word.quantity}
                        />
                    ))
                )}
            </div>
        </div >
    )
}

export default ListWordsCard