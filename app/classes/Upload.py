import os
from flask import Flask, flash, request, redirect, url_for
from flask import current_app as flask_app
from app import SITE_ROOT

class Upload():
    """
    Upload class.

    Presumably this class is responsible for telling firebase to add the received data to the server.
    """
    def __init__(self):
        self.extensions = {'png', 'jpg', 'jpeg', 'gif'}
        #this appears to specify a set of possible file types the site will accept.

    def upload(self, file, filename):
        allowed_extension = self.allowed_file(file.filename)
        if allowed_extension:
            fullname = filename + '.' + allowed_extension
            destination = os.path.join('static/uploads', fullname)
            file.save(os.path.join(SITE_ROOT, destination))
            return destination
            #This bit appears to be the one actually telling Firebase to add the data to the server.
        else:
            raise Exception("Only allowed filetypes: ".join(self.extensions.values()))
        #This error tells the user if they gave a bad filetype. 

    def allowed_file(self, filename):
        if ('.' in filename and filename.rsplit('.', 1)[1].lower() in self.extensions):
            return filename.rsplit('.', 1)[1].lower()
        return False
    #And here, the site checks to make sure incoming files are of the available filetypes.