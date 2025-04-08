import './TaskSection.scss';  // Make sure the path is correct
const TaskSection = () => {

    return <>
        <main className="project">
            <div className="project-tasks">
                <div className="project-column">
                    <div className="project-column-heading">
                        <h2 className="project-column-heading__title todo-heading">Todo</h2>
                        <button className="project-column-heading__options">
                            <i className="fas fa-ellipsis-h" />
                        </button>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--copyright">Copywriting</span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Konsep hero title yang menarik</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />3
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />7
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--design">UI Design</span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Icon di section our services</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />2
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />5
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--copyright">Copywriting</span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Konsep hero title yang menarik</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />2
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />3
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                </div>
                <div className="project-column">
                    <div className="project-column-heading">
                        <h2 className="project-column-heading__title working-on-heading">Working On</h2>
                        <button className="project-column-heading__options">
                            <i className="fas fa-ellipsis-h" />
                        </button>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--design">UI Design</span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Replace lorem ipsum text in the final designs</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />5
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />5
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--illustration">
                                Illustration
                            </span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Create and generate the custom SVG illustrations.</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />8
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />7
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--copyright">Copywriting</span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Proof read the legal page and check for and loopholes</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />
                                12
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />
                                11
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--illustration">
                                Illustration
                            </span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Create the landing page graphics for the hero slider.</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />4
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />8
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                </div>
                <div className="project-column">
                    <div className="project-column-heading">
                        <h2 className="project-column-heading__title done-heading">Done</h2>
                        <button className="project-column-heading__options">
                            <i className="fas fa-ellipsis-h" />
                        </button>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--illustration">
                                Illustration
                            </span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Send Advert illustrations over to production company.</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />
                                12
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />5
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--illustration">
                                Illustration
                            </span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Dawn wants to move the text 3px to the right.</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />3
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />7
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                    <div className="task" draggable="true">
                        <div className="task__tags">
                            <span className="task__tag task__tag--copyright">Copywriting</span>
                            <button className="task__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        <p>Amend the contract details.</p>
                        <div className="task__stats">
                            <span>
                                <time dateTime="2021-11-24T20:00:00">
                                    <i className="fas fa-flag" />
                                    Nov 24
                                </time>
                            </span>
                            <span>
                                <i className="fas fa-comment" />8
                            </span>
                            <span>
                                <i className="fas fa-paperclip" />
                                16
                            </span>
                            <span className="task__owner" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
      
    </>
}

export default TaskSection;